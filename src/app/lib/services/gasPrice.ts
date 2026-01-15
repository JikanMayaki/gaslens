import type { GasPrice } from '@/types/fee';
import type { ApiResponse } from '@/types/api';

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/v2/api';

/**
 * Fetch current gas prices from Etherscan
 */
export async function fetchGasPrices(): Promise<ApiResponse<GasPrice>> {
  try {
    const response = await fetch(
      `${ETHERSCAN_BASE_URL}?chainid=1&module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Etherscan API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== '1') {
      throw new Error(data.message || 'Failed to fetch gas prices');
    }

    const result = data.result;

    // Convert Etherscan response to our GasPrice format
    const gasPrice: GasPrice = {
      slow: parseFloat(result.SafeGasPrice),
      standard: parseFloat(result.ProposeGasPrice),
      fast: parseFloat(result.FastGasPrice),
      instant: parseFloat(result.FastGasPrice) * 1.2, // Estimate 20% higher for instant
      timestamp: Date.now(),
    };

    return {
      data: gasPrice,
      success: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error fetching gas prices:', error);

    return {
      data: getMockGasPrice(),
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now(),
    };
  }
}

/**
 * Mock gas price data for development/fallback
 */
function getMockGasPrice(): GasPrice {
  return {
    slow: 25,
    standard: 35,
    fast: 45,
    instant: 55,
    timestamp: Date.now(),
  };
}

/**
 * Calculate estimated transaction time based on gas price
 */
export function estimateTransactionTime(gasPriceGwei: number, currentGasPrice: GasPrice): number {
  if (gasPriceGwei >= currentGasPrice.instant) {
    return 15; // ~15 seconds
  } else if (gasPriceGwei >= currentGasPrice.fast) {
    return 30; // ~30 seconds
  } else if (gasPriceGwei >= currentGasPrice.standard) {
    return 60; // ~1 minute
  } else {
    return 180; // ~3 minutes
  }
}

/**
 * Get recommended gas price for a given priority
 */
export function getRecommendedGasPrice(
  priority: 'slow' | 'standard' | 'fast' | 'instant',
  gasPrice: GasPrice
): number {
  return gasPrice[priority];
}
