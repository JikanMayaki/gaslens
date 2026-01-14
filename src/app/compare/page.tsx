'use client';

import { useState, useMemo } from 'react';
import { ArrowDown, RefreshCw, AlertCircle, Zap, TrendingDown } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-zinc-950 dark:via-blue-950/10 dark:to-zinc-950">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-3 text-zinc-900 dark:text-zinc-50 tracking-tight">
                Find the <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Best Route</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
                Compare 7+ protocols · Save 30-70% · Get results in 2 seconds
              </p>
            </div>
            {gasPrice && (
              <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Live Gas Price</p>
                  <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums">
                    {formatGwei(currentGasPrice)}
                  </p>
                </div>
                <button
                  onClick={refetchGas}
                  className="ml-2 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors"
                  title="Refresh gas price"
                >
                  <RefreshCw className="w-4 h-4" />
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
        <Card padding="none" className="mb-8 overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-3 text-zinc-900 dark:text-zinc-50">
                  You Send
                </label>
                <div className="flex gap-3">
                  <select
                    value={tokenIn}
                    onChange={(e) => setTokenIn(e.target.value)}
                    className="px-4 py-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-bold min-w-[140px] hover:border-blue-500 dark:hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="flex-1 px-4 py-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-bold text-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSwapTokens}
                  className="p-3 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-md hover:shadow-lg hover:rotate-180 duration-300"
                >
                  <ArrowDown className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-zinc-900 dark:text-zinc-50">
                  You Receive
                </label>
                <select
                  value={tokenOut}
                  onChange={(e) => setTokenOut(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-bold hover:border-blue-500 dark:hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                {feesLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Finding Best Routes...
                  </span>
                ) : (
                  'Compare Routes Now'
                )}
              </button>
            </div>
          </div>
        </Card>

        {/* Best Path Highlight */}
        {bestPath && (
          <div className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-green-600 p-1 shadow-2xl shadow-green-500/30 animate-pulse">
            <div className="bg-white dark:bg-zinc-900 rounded-[14px] p-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
                  <p className="text-sm font-bold text-green-800 dark:text-green-200 uppercase tracking-wide">
                    Best Route Found!
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-black text-green-600 dark:text-green-400 mb-2">
                  Save ${bestPath.savingsUsd?.toFixed(2)}
                </p>
                <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                  with {bestPath.action.provider}
                </p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-2 font-medium">
                  {bestPath.savingsPercent?.toFixed(1)}% cheaper than the most expensive option
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {compareEnabled && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50">
                Available Routes
                <span className="ml-3 text-lg font-semibold px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg">
                  {paths.length} options
                </span>
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Sorted by total cost · Cheapest first
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
    </div>
  );
}
