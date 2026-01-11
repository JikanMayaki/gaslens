'use client';

import { useState, useEffect } from 'react';
import type { GasPrice } from '@/types/fee';
import { fetchGasPrices } from '../services/gasPrice';

interface UseGasPriceReturn {
  gasPrice: GasPrice | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage real-time gas prices
 */
export function useGasPrice(autoRefresh = true, refreshInterval = 12000): UseGasPriceReturn {
  const [gasPrice, setGasPrice] = useState<GasPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchGasPrices();

      if (response.success) {
        setGasPrice(response.data);
      } else {
        setError(response.error || 'Failed to fetch gas prices');
        // Still set the mock data
        setGasPrice(response.data);
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
  }, [autoRefresh, refreshInterval]);

  return {
    gasPrice,
    isLoading,
    error,
    refetch: fetchData,
  };
}
