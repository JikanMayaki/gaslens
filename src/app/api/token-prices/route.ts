import { NextResponse, NextRequest } from 'next/server';
import { checkRateLimit, getClientIp, RATE_LIMIT_CONFIGS } from '@/app/lib/middleware/rateLimit';

// Server-side only API key (no NEXT_PUBLIC_ prefix)
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

interface TokenPrice {
  [tokenId: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

// Mock prices for fallback
const MOCK_PRICES: TokenPrice = {
  ethereum: { usd: 2000, usd_24h_change: 2.5 },
  'usd-coin': { usd: 1.0, usd_24h_change: 0.01 },
  tether: { usd: 1.0, usd_24h_change: -0.01 },
  dai: { usd: 1.0, usd_24h_change: 0.0 },
  'wrapped-bitcoin': { usd: 42000, usd_24h_change: 1.8 },
  bitcoin: { usd: 42000, usd_24h_change: 1.8 },
  'matic-network': { usd: 0.85, usd_24h_change: 1.2 },
  chainlink: { usd: 14.5, usd_24h_change: 0.8 },
  uniswap: { usd: 6.2, usd_24h_change: -0.5 },
  aave: { usd: 95, usd_24h_change: 1.1 },
};

function getMockPrices(tokenIds: string[]): TokenPrice {
  const result: TokenPrice = {};
  tokenIds.forEach(id => {
    result[id] = MOCK_PRICES[id] || { usd: 1.0, usd_24h_change: 0 };
  });
  return result;
}

export async function GET(request: NextRequest) {
  // Apply rate limiting
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
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'Missing required parameter: ids',
          timestamp: Date.now(),
        },
        { status: 400 }
      );
    }

    // Sanitize and validate token IDs
    const tokenIds = idsParam
      .split(',')
      .map(id => id.trim().toLowerCase())
      .filter(id => /^[a-z0-9-]+$/.test(id))
      .slice(0, 20); // Limit to 20 tokens max

    if (tokenIds.length === 0) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'No valid token IDs provided',
          timestamp: Date.now(),
        },
        { status: 400 }
      );
    }

    // Fetch from CoinGecko (free tier works without API key, just rate limited)
    const ids = tokenIds.join(',');
    const url = `${COINGECKO_BASE_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

    // Only add API key header if provided (for pro tier with higher limits)
    const headers: HeadersInit = {};
    if (COINGECKO_API_KEY) {
      headers['x-cg-pro-api-key'] = COINGECKO_API_KEY;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data: TokenPrice = await response.json();

    // Validate response
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response from CoinGecko');
    }

    return NextResponse.json(
      {
        data,
        success: true,
        source: 'coingecko',
        timestamp: Date.now(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
          'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.protocolFees.maxRequests),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': String(Math.floor(rateLimitResult.resetTime / 1000)),
        },
      }
    );
  } catch (error) {
    console.error('Token prices API error:', error);

    // Return mock data on error
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids') || 'ethereum';
    const tokenIds = idsParam.split(',').map(id => id.trim().toLowerCase());

    return NextResponse.json(
      {
        data: getMockPrices(tokenIds),
        success: false,
        error: 'Failed to fetch token prices',
        source: 'mock',
        timestamp: Date.now(),
      },
      { status: 200 } // Return 200 with mock data for graceful degradation
    );
  }
}
