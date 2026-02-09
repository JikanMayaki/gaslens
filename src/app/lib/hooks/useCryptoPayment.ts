'use client';

import { useState } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parseUnits, Address } from 'viem';

// USDC contract addresses on different chains
const USDC_ADDRESSES: Record<number, Address> = {
  1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Mainnet
  10: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', // Optimism
  137: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // Polygon
  8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base
  42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // Arbitrum
};

// ERC20 ABI for USDC transfers
const USDC_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
] as const;

export type PaymentCurrency = 'ETH' | 'USDC';

interface UseCryptoPaymentProps {
  amount: number; // Amount in USD
  planName: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
}

export function useCryptoPayment({ amount, planName, onSuccess, onError }: UseCryptoPaymentProps) {
  const { address, chain } = useAccount();
  const [currency, setCurrency] = useState<PaymentCurrency>('USDC');
  const [loading, setLoading] = useState(false);

  // Treasury wallet address (you'll set this in .env)
  const treasuryAddress = (process.env.NEXT_PUBLIC_TREASURY_WALLET_ADDRESS || '0x0000000000000000000000000000000000000000') as Address;

  // ETH payment
  const { sendTransaction: sendEth, data: ethTxHash } = useSendTransaction();
  const { isLoading: isEthPending, isSuccess: isEthSuccess } = useWaitForTransactionReceipt({
    hash: ethTxHash,
  });

  // USDC payment
  const { writeContract: sendUsdc, data: usdcTxHash } = useWriteContract();
  const { isLoading: isUsdcPending, isSuccess: isUsdcSuccess } = useWaitForTransactionReceipt({
    hash: usdcTxHash,
  });

  const payWithEth = async (ethPrice: number) => {
    if (!address || !chain) {
      throw new Error('Please connect your wallet');
    }

    setLoading(true);
    try {
      // Calculate ETH amount needed
      const ethAmount = amount / ethPrice;
      const value = parseUnits(ethAmount.toFixed(18), 18);

      sendEth({
        to: treasuryAddress,
        value,
      });
    } catch (error: any) {
      setLoading(false);
      onError?.(error);
      throw error;
    }
  };

  const payWithUsdc = async () => {
    if (!address || !chain) {
      throw new Error('Please connect your wallet');
    }

    if (!chain.id || !USDC_ADDRESSES[chain.id]) {
      throw new Error('USDC not supported on this chain. Please switch to Ethereum, Optimism, Polygon, Base, or Arbitrum.');
    }

    setLoading(true);
    try {
      // USDC has 6 decimals
      const usdcAmount = parseUnits(amount.toString(), 6);

      sendUsdc({
        address: USDC_ADDRESSES[chain.id],
        abi: USDC_ABI,
        functionName: 'transfer',
        args: [treasuryAddress, usdcAmount],
      });
    } catch (error: any) {
      setLoading(false);
      onError?.(error);
      throw error;
    }
  };

  // Handle transaction success
  if (isEthSuccess && ethTxHash) {
    setLoading(false);
    onSuccess?.(ethTxHash);
  }

  if (isUsdcSuccess && usdcTxHash) {
    setLoading(false);
    onSuccess?.(usdcTxHash);
  }

  return {
    currency,
    setCurrency,
    payWithEth,
    payWithUsdc,
    loading: loading || isEthPending || isUsdcPending,
    txHash: ethTxHash || usdcTxHash,
    isSuccess: isEthSuccess || isUsdcSuccess,
    isConnected: !!address,
  };
}
