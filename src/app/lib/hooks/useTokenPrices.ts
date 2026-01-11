'use client';

import { useState, useEffect } from 'react';
import { fetchTokenPrices, getEthPrice } from '../services/tokens';

interface TokenPriceData {
  usd: number;
  usd_24h_change: number;
}

interface UseTokenPricesReturn {
  prices: Record<string, TokenPriceData>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch token prices
 */
export function useTokenPrices(
  tokenIds: string[],
  autoRefresh = true,
  refreshInterval = 30000
): UseTokenPricesReturn {
  const [prices, setPrices] = useState<Record<string, TokenPriceData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (tokenIds.length === 0) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchTokenPrices(tokenIds);

      if (response.success) {
        setPrices(response.data);
      } else {
        setError(response.error || 'Failed to fetch token prices');
        setPrices(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [JSON.stringify(tokenIds), autoRefresh, refreshInterval]);

  return {
    prices,
    isLoading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook to fetch ETH price specifically
 */
export function useEthPrice(autoRefresh = true, refreshInterval = 30000) {
  const [price, setPrice] = useState<number>(2000);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const ethPrice = await getEthPrice();
      setPrice(ethPrice);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ETH price');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  return {
    price,
    isLoading,
    error,
    refetch: fetchData,
  };
}
