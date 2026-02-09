import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const verifyPaymentSchema = z.object({
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  planName: z.enum(['Pro', 'Enterprise']),
  amount: z.number().positive(),
  currency: z.enum(['ETH', 'USDC']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = verifyPaymentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { txHash, walletAddress, planName, amount, currency } = validation.data;

    // TODO: Implement actual on-chain verification
    // 1. Query the transaction using a provider (Alchemy, Infura)
    // 2. Verify the transaction:
    //    - Was sent to the correct treasury address
    //    - Has the correct amount
    //    - Is confirmed (enough blocks)
    //    - Hasn't been used before (prevent replay attacks)
    // 3. Store the subscription in your database
    //    - walletAddress -> Pro tier
    //    - txHash -> payment record
    //    - expiryDate -> 30 days from now

    // For now, return success with a placeholder
    console.log('Payment received:', {
      txHash,
      walletAddress,
      planName,
      amount,
      currency,
    });

    return NextResponse.json({
      success: true,
      subscription: {
        tier: planName,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        walletAddress,
        txHash,
      },
    });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
