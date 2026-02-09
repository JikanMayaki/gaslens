import type { ApiResponse } from '@/types/api';

interface TokenPrice {
  [tokenId: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

/**
 * Fetch token prices via internal API (proxies to CoinGecko server-side)
 */
export async function fetchTokenPrices(
  tokenIds: string[]
): Promise<ApiResponse<TokenPrice>> {
  try {
    const ids = tokenIds.join(',');
    const response = await fetch(`/api/token-prices?ids=${encodeURIComponent(ids)}`);

    if (!response.ok) {
      throw new Error(`Token prices API error: ${response.status}`);
    }

    const result = await response.json();

    return {
      data: result.data,
      success: result.success,
      error: result.error,
      timestamp: result.timestamp,
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
 * Mock token prices for fallback
 */
function getMockTokenPrices(tokenIds: string[]): TokenPrice {
  const mockPrices: TokenPrice = {
    ethereum: { usd: 2000, usd_24h_change: 2.5 },
    'usd-coin': { usd: 1.0, usd_24h_change: 0.01 },
    tether: { usd: 1.0, usd_24h_change: -0.01 },
    dai: { usd: 1.0, usd_24h_change: 0.0 },
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
