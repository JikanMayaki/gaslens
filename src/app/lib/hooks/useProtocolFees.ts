'use client';

import { useState, useEffect } from 'react';
import type { ProtocolFee } from '@/types/protocol';
import { getProtocolFees } from '../services/protocols';

interface UseProtocolFeesParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  gasPrice: number;
  enabled?: boolean;
}

interface UseProtocolFeesReturn {
  fees: ProtocolFee[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch protocol fees for a swap
 */
export function useProtocolFees({
  tokenIn,
  tokenOut,
  amountIn,
  gasPrice,
  enabled = true,
}: UseProtocolFeesParams): UseProtocolFeesReturn {
  const [fees, setFees] = useState<ProtocolFee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!enabled || !tokenIn || !tokenOut || !amountIn || parseFloat(amountIn) <= 0) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const protocolFees = await getProtocolFees(tokenIn, tokenOut, amountIn, gasPrice);
      setFees(protocolFees);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch protocol fees');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tokenIn, tokenOut, amountIn, gasPrice, enabled]);

  return {
    fees,
    isLoading,
    error,
    refetch: fetchData,
  };
}
