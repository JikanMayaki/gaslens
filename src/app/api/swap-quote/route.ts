import { NextResponse, NextRequest } from 'next/server';
import { checkRateLimit, getClientIp, RATE_LIMIT_CONFIGS } from '@/app/lib/middleware/rateLimit';
import { z } from 'zod';

// Server-side only API keys (no NEXT_PUBLIC_ prefix)
const ONEINCH_API_KEY = process.env.ONEINCH_API_KEY;
const ZEROX_API_KEY = process.env.ZEROX_API_KEY;

// API endpoints
const ONEINCH_BASE_URL = 'https://api.1inch.dev/swap/v6.0/1';
const ZEROX_BASE_URL = 'https://api.0x.org/swap/v1';

// Common token addresses on Ethereum mainnet
const TOKEN_ADDRESSES: Record<string, string> = {
  ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  DAI: '0x6B175474E89094C44Da98b954EesweepingDcB61',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  AAVE: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
  CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
  MATIC: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  SHIB: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
};

// Request validation schema
const quoteQuerySchema = z.object({
  tokenIn: z.string().min(1).max(42),
  tokenOut: z.string().min(1).max(42),
  amount: z.string().regex(/^\d+(\.\d+)?$/).transform(val => parseFloat(val)),
});

interface SwapQuote {
  protocol: string;
  protocolId: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  estimatedGas: number;
  gasPriceGwei: number;
  priceImpact: number;
  route?: string[];
}

interface QuoteResponse {
  quotes: SwapQuote[];
  bestQuote: SwapQuote | null;
  timestamp: number;
}

// Get token address from symbol or return as-is if already an address
function getTokenAddress(tokenSymbol: string): string {
  const upper = tokenSymbol.toUpperCase();
  return TOKEN_ADDRESSES[upper] || tokenSymbol;
}

// Fetch quote from 1inch API
async function fetch1inchQuote(
  fromToken: string,
  toToken: string,
  amount: number
): Promise<SwapQuote | null> {
  if (!ONEINCH_API_KEY) return null;

  try {
    const fromAddress = getTokenAddress(fromToken);
    const toAddress = getTokenAddress(toToken);

    // Convert amount to wei (assuming 18 decimals for simplicity)
    const amountWei = BigInt(Math.floor(amount * 1e18)).toString();

    const url = `${ONEINCH_BASE_URL}/quote?src=${fromAddress}&dst=${toAddress}&amount=${amountWei}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ONEINCH_API_KEY}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error('1inch API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();

    return {
      protocol: '1inch',
      protocolId: '1inch',
      fromToken,
      toToken,
      fromAmount: amount.toString(),
      toAmount: (parseInt(data.toAmount) / 1e18).toFixed(6),
      estimatedGas: parseInt(data.gas) || 150000,
      gasPriceGwei: 35, // Will be updated with current gas price
      priceImpact: 0, // 1inch doesn't return this in quote endpoint
      route: data.protocols?.[0]?.map((p: { name: string }[]) => p[0]?.name) || [],
    };
  } catch (error) {
    console.error('1inch quote error:', error);
    return null;
  }
}

// Fetch quote from 0x API
async function fetch0xQuote(
  fromToken: string,
  toToken: string,
  amount: number
): Promise<SwapQuote | null> {
  if (!ZEROX_API_KEY) return null;

  try {
    const fromAddress = getTokenAddress(fromToken);
    const toAddress = getTokenAddress(toToken);

    // Convert amount to wei
    const amountWei = BigInt(Math.floor(amount * 1e18)).toString();

    const url = `${ZEROX_BASE_URL}/quote?sellToken=${fromAddress}&buyToken=${toAddress}&sellAmount=${amountWei}`;

    const response = await fetch(url, {
      headers: {
        '0x-api-key': ZEROX_API_KEY,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error('0x API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();

    return {
      protocol: '0x (Matcha)',
      protocolId: '0x',
      fromToken,
      toToken,
      fromAmount: amount.toString(),
      toAmount: (parseInt(data.buyAmount) / 1e18).toFixed(6),
      estimatedGas: parseInt(data.estimatedGas) || 150000,
      gasPriceGwei: parseInt(data.gasPrice) / 1e9 || 35,
      priceImpact: parseFloat(data.estimatedPriceImpact) || 0,
      route: data.sources?.filter((s: { proportion: string }) => parseFloat(s.proportion) > 0).map((s: { name: string }) => s.name) || [],
    };
  } catch (error) {
    console.error('0x quote error:', error);
    return null;
  }
}

// Generate mock quote for testing
function getMockQuote(
  protocol: string,
  protocolId: string,
  fromToken: string,
  toToken: string,
  amount: number
): SwapQuote {
  // Mock exchange rates
  const rates: Record<string, number> = {
    'ETH-USDC': 2000,
    'ETH-USDT': 2000,
    'ETH-DAI': 2000,
    'USDC-ETH': 0.0005,
    'USDT-ETH': 0.0005,
    'WBTC-ETH': 21,
    'ETH-WBTC': 0.048,
  };

  const pair = `${fromToken.toUpperCase()}-${toToken.toUpperCase()}`;
  const rate = rates[pair] || 1;
  const outputAmount = amount * rate * (1 - 0.003); // 0.3% fee

  return {
    protocol,
    protocolId,
    fromToken,
    toToken,
    fromAmount: amount.toString(),
    toAmount: outputAmount.toFixed(6),
    estimatedGas: 150000 + Math.floor(Math.random() * 30000),
    gasPriceGwei: 35,
    priceImpact: Math.random() * 0.5,
    route: [protocol],
  };
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
        },
      }
    );
  }

  try {
    const { searchParams } = new URL(request.url);

    // Validate input
    const parseResult = quoteQuerySchema.safeParse({
      tokenIn: searchParams.get('tokenIn'),
      tokenOut: searchParams.get('tokenOut'),
      amount: searchParams.get('amount'),
    });

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid parameters',
          details: parseResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { tokenIn, tokenOut, amount } = parseResult.data;

    // Fetch quotes from both APIs in parallel
    const [oneInchQuote, zeroXQuote] = await Promise.all([
      fetch1inchQuote(tokenIn, tokenOut, amount),
      fetch0xQuote(tokenIn, tokenOut, amount),
    ]);

    const quotes: SwapQuote[] = [];

    if (oneInchQuote) {
      quotes.push(oneInchQuote);
    }

    if (zeroXQuote) {
      quotes.push(zeroXQuote);
    }

    // If no real quotes, return mock data
    if (quotes.length === 0) {
      quotes.push(
        getMockQuote('1inch', '1inch', tokenIn, tokenOut, amount),
        getMockQuote('0x (Matcha)', '0x', tokenIn, tokenOut, amount)
      );
    }

    // Sort by output amount (best quote first)
    quotes.sort((a, b) => parseFloat(b.toAmount) - parseFloat(a.toAmount));

    const response: QuoteResponse = {
      quotes,
      bestQuote: quotes[0] || null,
      timestamp: Date.now(),
    };

    return NextResponse.json(
      {
        data: response,
        success: true,
        source: oneInchQuote || zeroXQuote ? 'live' : 'mock',
        timestamp: Date.now(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=5',
          'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.protocolFees.maxRequests),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Swap quote API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch swap quotes',
      },
      { status: 500 }
    );
  }
}
