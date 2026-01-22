import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import type { ProtocolFee } from '@/types/protocol';
import { checkRateLimit, getClientIp, RATE_LIMIT_CONFIGS } from '@/app/lib/middleware/rateLimit';
import { protocolFeesQuerySchema, validateInput } from '@/app/lib/validation/apiSchemas';

export async function GET(request: NextRequest) {
  // SECURITY FIX: Apply rate limiting
  const clientIp = getClientIp(request);
  const rateLimitResult = checkRateLimit(clientIp, RATE_LIMIT_CONFIGS.protocolFees);

  if (rateLimitResult.limited) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.protocolFees.maxRequests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(rateLimitResult.resetTime / 1000)),
        },
      }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;

    // SECURITY FIX: Use Zod validation for comprehensive input validation
    const validationResult = validateInput(protocolFeesQuerySchema, {
      tokenIn: searchParams.get('tokenIn'),
      tokenOut: searchParams.get('tokenOut'),
      amountIn: searchParams.get('amountIn'),
      gasPrice: searchParams.get('gasPrice') || '35',
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid parameters',
          details: validationResult.errors,
        },
        { status: 400 }
      );
    }

    const { tokenIn, tokenOut, amountIn, gasPrice: gasPriceStr } = validationResult.data;

    // Parse validated numeric values
    const amount = parseFloat(amountIn);
    const gasPrice = parseFloat(gasPriceStr || '35');

    // Mock protocol fee data (in production, this would call actual DEX APIs)
    const protocols = [
      {
        protocolId: 'uniswap-v3',
        protocolName: 'Uniswap V3',
        baseFeeBps: 30, // 0.3%
        gasEstimate: 150000,
      },
      {
        protocolId: 'sushiswap',
        protocolName: 'SushiSwap',
        baseFeeBps: 30, // 0.3%
        gasEstimate: 145000,
      },
      {
        protocolId: 'curve',
        protocolName: 'Curve',
        baseFeeBps: 4, // 0.04%
        gasEstimate: 120000,
      },
      {
        protocolId: 'chainflip',
        protocolName: 'Chainflip',
        baseFeeBps: 10, // 0.1%
        gasEstimate: 135000,
      },
      {
        protocolId: 'relay',
        protocolName: 'Relay',
        baseFeeBps: 15, // 0.15%
        gasEstimate: 130000,
      },
    ];

    const ethPrice = 2000; // In production, fetch from CoinGecko

    const fees: ProtocolFee[] = protocols.map(protocol => {
      const protocolFeeAmount = (amount * protocol.baseFeeBps) / 10000;
      const gasCostEth = (protocol.gasEstimate * gasPrice) / 1e9;
      const gasCostUsd = gasCostEth * ethPrice;
      const protocolFeeUsd = protocolFeeAmount * ethPrice;

      return {
        ...protocol,
        totalFeeUsd: gasCostUsd + protocolFeeUsd,
      };
    });

    return NextResponse.json(
      {
        data: fees,
        success: true,
        timestamp: Date.now(),
      },
      {
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.protocolFees.maxRequests),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': String(Math.floor(rateLimitResult.resetTime / 1000)),
        },
      }
    );
  } catch (error) {
    // SECURITY FIX: Generic error message (no information disclosure)
    return NextResponse.json(
      {
        error: 'Failed to calculate protocol fees',
      },
      { status: 500 }
    );
  }
}
