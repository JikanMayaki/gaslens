'use client';

import { useState, useMemo } from 'react';
import { ArrowDown, RefreshCw, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { PathCard } from '../components/PathCard';
import { TOKENS } from '../lib/constants/tokens';
import { formatGwei } from '../lib/constants/api/utils/formatting';
import { useGasPrice } from '../lib/hooks/useGasPrice';
import { useProtocolFees } from '../lib/hooks/useProtocolFees';
import { useEthPrice } from '../lib/hooks/useTokenPrices';
import { buildSwapPaths } from '../lib/services/pathBuilder';

export default function ComparePage() {
  const [tokenIn, setTokenIn] = useState('ETH');
  const [tokenOut, setTokenOut] = useState('USDC');
  const [amount, setAmount] = useState('1');
  const [compareEnabled, setCompareEnabled] = useState(false);

  // Fetch real-time data
  const { gasPrice, isLoading: gasLoading, error: gasError, refetch: refetchGas } = useGasPrice();
  const { price: ethPrice } = useEthPrice();

  const currentGasPrice = gasPrice?.standard || 35;

  const {
    fees,
    isLoading: feesLoading,
    error: feesError,
    refetch: refetchFees,
  } = useProtocolFees({
    tokenIn,
    tokenOut,
    amountIn: amount,
    gasPrice: currentGasPrice,
    enabled: compareEnabled,
  });

  const handleSwapTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  };

  const handleCompare = async () => {
    setCompareEnabled(true);
    await refetchFees();
  };

  // Build swap paths from protocol fees
  const paths = useMemo(() => {
    if (fees.length === 0) return [];
    return buildSwapPaths(fees, tokenIn, tokenOut, amount, ethPrice || 2000);
  }, [fees, tokenIn, tokenOut, amount, ethPrice]);

  const bestPath = paths.find((p) => p.isBest);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
              Find the Best Swap Route
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Compare paths across protocols and save money
            </p>
          </div>
          {gasPrice && (
            <div className="text-right">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Current Gas Price</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {formatGwei(currentGasPrice)}
              </p>
              <button
                onClick={refetchGas}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-1"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>
          )}
        </div>

        {/* Gas Price Alert */}
        {gasError && (
          <Card
            padding="md"
            className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
          >
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">Using mock data. {gasError}</p>
            </div>
          </Card>
        )}

        {/* Swap Input */}
        <Card padding="lg" className="mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                From
              </label>
              <div className="flex gap-3">
                <select
                  value={tokenIn}
                  onChange={(e) => setTokenIn(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 font-medium min-w-[140px]"
                >
                  {TOKENS.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSwapTokens}
                className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ArrowDown className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                To
              </label>
              <select
                value={tokenOut}
                onChange={(e) => setTokenOut(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 font-medium"
              >
                {TOKENS.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCompare}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {feesLoading ? 'Finding Best Routes...' : 'Compare Routes'}
            </button>
          </div>
        </Card>

        {/* Best Path Highlight */}
        {bestPath && (
          <Card padding="md" className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="text-center">
              <p className="text-sm text-green-800 dark:text-green-200 mb-1">Best Route Found!</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                Save ${bestPath.savingsUsd?.toFixed(2)} with {bestPath.action.provider}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                {bestPath.savingsPercent?.toFixed(1)}% cheaper than the most expensive option
              </p>
            </div>
          </Card>
        )}

        {/* Results */}
        {compareEnabled && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Available Routes ({paths.length})
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Sorted by total cost (cheapest first)
              </p>
            </div>

            {feesLoading ? (
              <Card padding="lg">
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Analyzing routes across protocols...
                  </p>
                </div>
              </Card>
            ) : feesError ? (
              <Card padding="lg" className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Error loading routes</p>
                    <p className="text-sm">{feesError}</p>
                  </div>
                </div>
              </Card>
            ) : paths.length > 0 ? (
              <div className="space-y-4">
                {paths.map((path, index) => (
                  <PathCard key={path.id} path={path} rank={index + 1} />
                ))}
              </div>
            ) : (
              <Card padding="lg">
                <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
                  <p>Click "Compare Routes" to see available swap paths</p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
