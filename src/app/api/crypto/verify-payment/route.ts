import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '../../../lib/supabase';
import {
  verifyEthPayment,
  verifyUsdcPayment,
  getCurrentEthPrice,
} from '../../../lib/blockchain/verify-transaction';

const verifyPaymentSchema = z.object({
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash'),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
  planName: z.enum(['Pro', 'Enterprise']),
  amount: z.number().positive(),
  currency: z.enum(['ETH', 'USDC']),
});

// Rate limiting: max 3 attempts per wallet per 5 minutes
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

async function checkRateLimit(
  supabase: ReturnType<typeof createServerClient>,
  walletAddress: string,
  ipAddress: string | null
): Promise<{ allowed: boolean; error?: string }> {
  const cutoff = new Date(Date.now() - RATE_LIMIT_WINDOW);

  // Check wallet-based rate limit
  const { data: walletAttempts, error: walletError } = await supabase
    .from('payment_attempts')
    .select('id')
    .eq('wallet_address', walletAddress.toLowerCase())
    .gte('attempted_at', cutoff.toISOString());

  if (walletError) {
    console.error('Rate limit check error:', walletError);
  }

  if (walletAttempts && walletAttempts.length >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      error: 'Too many payment verification attempts. Please wait 5 minutes.',
    };
  }

  // Check IP-based rate limit (if available)
  if (ipAddress) {
    const { data: ipAttempts, error: ipError } = await supabase
      .from('payment_attempts')
      .select('id')
      .eq('ip_address', ipAddress)
      .gte('attempted_at', cutoff.toISOString());

    if (ipError) {
      console.error('IP rate limit check error:', ipError);
    }

    if (ipAttempts && ipAttempts.length >= MAX_ATTEMPTS * 2) {
      return {
        allowed: false,
        error: 'Too many payment verification attempts from this IP. Please wait 5 minutes.',
      };
    }
  }

  return { allowed: true };
}

async function logPaymentAttempt(
  supabase: ReturnType<typeof createServerClient>,
  walletAddress: string,
  txHash: string,
  ipAddress: string | null,
  success: boolean,
  errorMessage?: string
) {
  await supabase.from('payment_attempts').insert({
    wallet_address: walletAddress.toLowerCase(),
    tx_hash: txHash,
    ip_address: ipAddress,
    success,
    error_message: errorMessage || null,
  });
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient();

  try {
    // Parse and validate request
    const body = await request.json();
    const validation = verifyPaymentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { txHash, walletAddress, planName, amount, currency } = validation.data;

    // Get client IP for rate limiting
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null;

    // Check rate limiting
    const rateLimitCheck = await checkRateLimit(supabase, walletAddress, ipAddress);
    if (!rateLimitCheck.allowed) {
      await logPaymentAttempt(supabase, walletAddress, txHash, ipAddress, false, rateLimitCheck.error);
      return NextResponse.json(
        { error: rateLimitCheck.error },
        { status: 429 }
      );
    }

    // SECURITY CHECK 1: Check if transaction hash already used (replay attack prevention)
    const { data: existingTx, error: txCheckError } = await supabase
      .from('subscriptions')
      .select('id, wallet_address')
      .eq('tx_hash', txHash)
      .single();

    if (existingTx) {
      const errorMsg = 'Transaction already used for a subscription';
      await logPaymentAttempt(supabase, walletAddress, txHash, ipAddress, false, errorMsg);
      return NextResponse.json(
        { error: errorMsg, usedBy: existingTx.wallet_address },
        { status: 409 }
      );
    }

    // SECURITY CHECK 2: Check if wallet already has active subscription
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('id, tier, created_at')
      .eq('wallet_address', walletAddress.toLowerCase())
      .eq('is_active', true)
      .single();

    if (existingSub) {
      await logPaymentAttempt(
        supabase,
        walletAddress,
        txHash,
        ipAddress,
        false,
        'Wallet already has active subscription'
      );
      return NextResponse.json(
        {
          error: 'This wallet already has an active subscription',
          subscription: {
            tier: existingSub.tier,
            since: existingSub.created_at,
          },
        },
        { status: 409 }
      );
    }

    // SECURITY CHECK 3: Verify transaction on-chain
    let verificationResult;

    if (currency === 'ETH') {
      // Get current ETH price (server-side, not client-side)
      const ethPrice = await getCurrentEthPrice();
      verificationResult = await verifyEthPayment(txHash, amount, ethPrice);
    } else {
      // USDC verification
      verificationResult = await verifyUsdcPayment(txHash, amount);
    }

    if (!verificationResult.valid) {
      await logPaymentAttempt(supabase, walletAddress, txHash, ipAddress, false, verificationResult.error);
      return NextResponse.json(
        { error: verificationResult.error || 'Payment verification failed' },
        { status: 400 }
      );
    }

    // SECURITY CHECK 4: Ensure transaction sender matches wallet address
    if (!verificationResult.details || verificationResult.details.from.toLowerCase() !== walletAddress.toLowerCase()) {
      const errorMsg = 'Transaction sender does not match wallet address';
      await logPaymentAttempt(supabase, walletAddress, txHash, ipAddress, false, errorMsg);
      return NextResponse.json(
        {
          error: errorMsg,
          expected: walletAddress,
          actual: verificationResult.details?.from || 'unknown',
        },
        { status: 403 }
      );
    }

    // All checks passed - create subscription
    const { data: subscription, error: insertError } = await supabase
      .from('subscriptions')
      .insert({
        wallet_address: walletAddress.toLowerCase(),
        tx_hash: txHash,
        chain_id: 1, // Ethereum mainnet
        tier: planName,
        amount_usd: amount,
        currency,
        block_number: verificationResult.details!.blockNumber,
        is_active: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      await logPaymentAttempt(
        supabase,
        walletAddress,
        txHash,
        ipAddress,
        false,
        'Database error: ' + insertError.message
      );
      return NextResponse.json(
        { error: 'Failed to create subscription. Please contact support.' },
        { status: 500 }
      );
    }

    // Log successful attempt
    await logPaymentAttempt(supabase, walletAddress, txHash, ipAddress, true);

    return NextResponse.json({
      success: true,
      subscription: {
        tier: subscription.tier,
        walletAddress: subscription.wallet_address,
        txHash: subscription.tx_hash,
        createdAt: subscription.created_at,
        // Lifetime access - no expiration
        accessType: 'lifetime',
      },
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
