import type { ApiResponse } from '@/types/api';

const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

interface TokenPrice {
  [tokenId: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

/**
 * Fetch token prices from CoinGecko
 */
export async function fetchTokenPrices(
  tokenIds: string[]
): Promise<ApiResponse<TokenPrice>> {
  try {
    const ids = tokenIds.join(',');
    const url = `${COINGECKO_BASE_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

    const headers: HeadersInit = {};
    if (COINGECKO_API_KEY) {
      headers['x-cg-pro-api-key'] = COINGECKO_API_KEY;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      data,
      success: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error fetching token prices:', error);

    return {
      data: getMockTokenPrices(tokenIds),
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now(),
    };
  }
}

/**
 * Mock token prices for development
 */
function getMockTokenPrices(tokenIds: string[]): TokenPrice {
  const mockPrices: TokenPrice = {
    ethereum: { usd: 2000, usd_24h_change: 2.5 },
    'usd-coin': { usd: 1.0, usd_24h_change: 0.01 },
    tether: { usd: 1.0, usd_24h_change: -0.01 },
    'dai': { usd: 1.0, usd_24h_change: 0.0 },
    'wrapped-bitcoin': { usd: 42000, usd_24h_change: 1.8 },
  };

  const result: TokenPrice = {};
  tokenIds.forEach(id => {
    result[id] = mockPrices[id] || { usd: 1.0, usd_24h_change: 0 };
  });

  return result;
}

/**
 * Get ETH price in USD
 */
export async function getEthPrice(): Promise<number> {
  const response = await fetchTokenPrices(['ethereum']);
  return response.data.ethereum?.usd || 2000; // Default to $2000 if fetch fails
}
