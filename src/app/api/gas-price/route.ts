import { NextResponse } from 'next/server';
import type { GasPrice } from '@/types/fee';
import { checkRateLimit, getClientIp, RATE_LIMIT_CONFIGS } from '@/app/lib/middleware/rateLimit';

// SECURITY FIX: Use server-side only env var (no NEXT_PUBLIC_ prefix)
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/v2/api';

export async function GET(request: Request) {
  // SECURITY FIX: Apply rate limiting
  const clientIp = getClientIp(request);
  const rateLimitResult = checkRateLimit(clientIp, RATE_LIMIT_CONFIGS.gasPrice);

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
          'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.gasPrice.maxRequests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(rateLimitResult.resetTime / 1000)),
        },
      }
    );
  }

  try {
    // Validate API key exists
    if (!ETHERSCAN_API_KEY) {
      return NextResponse.json(
        {
          data: {
            slow: 25,
            standard: 35,
            fast: 45,
            instant: 55,
            timestamp: Date.now(),
          },
          success: false,
          error: 'API configuration error',
          timestamp: Date.now(),
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${ETHERSCAN_BASE_URL}?chainid=1&module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`,
      { next: { revalidate: 12 } } // Cache for 12 seconds
    );

    if (!response.ok) {
      throw new Error('Failed to fetch gas prices');
    }

    const data = await response.json();

    if (data.status !== '1') {
      throw new Error('API returned error status');
    }

    const result = data.result;

    // SECURITY FIX: Validate numbers and handle NaN
    const slow = parseFloat(result.SafeGasPrice);
    const standard = parseFloat(result.ProposeGasPrice);
    const fast = parseFloat(result.FastGasPrice);

    if (isNaN(slow) || isNaN(standard) || isNaN(fast)) {
      throw new Error('Invalid gas price data');
    }

    const gasPrice: GasPrice = {
      slow,
      standard,
      fast,
      instant: fast * 1.2,
      timestamp: Date.now(),
    };

    return NextResponse.json(
      {
        data: gasPrice,
        success: true,
        timestamp: Date.now(),
      },
      {
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.gasPrice.maxRequests),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': String(Math.floor(rateLimitResult.resetTime / 1000)),
        },
      }
    );
  } catch (error) {
    // SECURITY FIX: Generic error message (no information disclosure)
    return NextResponse.json(
      {
        data: {
          slow: 25,
          standard: 35,
          fast: 45,
          instant: 55,
          timestamp: Date.now(),
        },
        success: false,
        error: 'Failed to fetch gas prices',
        timestamp: Date.now(),
      },
      { status: 500 }
    );
  }
}
