import type { GasPrice } from '@/types/fee';
import type { ApiResponse } from '@/types/api';

/**
 * SECURITY FIX: Fetch gas prices through our internal API proxy
 * This prevents exposing API keys in the client bundle
 */
export async function fetchGasPrices(): Promise<ApiResponse<GasPrice>> {
  try {
    // Call our internal API route instead of calling Etherscan directly
    const response = await fetch('/api/gas-price');

    if (!response.ok) {
      throw new Error('Failed to fetch gas prices');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('API returned error status');
    }

    return data;
  } catch (error) {
    return {
      data: getMockGasPrice(),
      success: false,
      error: 'Failed to fetch gas prices',
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
