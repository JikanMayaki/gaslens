'use client';

import { useState, useMemo } from 'react';
import { ArrowDown, RefreshCw, Zap, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TOKENS } from '../lib/constants/tokens';
import { formatCurrency, formatGwei } from '../lib/constants/api/utils/formatting';
import { useGasPrice } from '../lib/hooks/useGasPrice';
import { useProtocolFees } from '../lib/hooks/useProtocolFees';
import { useEthPrice } from '../lib/hooks/useTokenPrices';
import { estimateTransactionTime } from '../lib/services/gasPrice';

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

  // Calculate savings and add time estimates
  const results = useMemo(() => {
    if (fees.length === 0) return [];

    const sorted = [...fees].sort((a, b) => a.totalFeeUsd - b.totalFeeUsd);
    const cheapest = sorted[0];

    return sorted.map((fee) => {
      const gasCostEth = (fee.gasEstimate * currentGasPrice) / 1e9;
      const protocolFeeEth = (parseFloat(amount) * fee.baseFeeBps) / 10000;

      return {
        protocol: fee.protocolName,
        gasFee: gasCostEth,
        protocolFee: protocolFeeEth,
        total: gasCostEth + protocolFeeEth,
        totalUsd: fee.totalFeeUsd,
        savings: cheapest.totalFeeUsd - fee.totalFeeUsd,
        savingsPercent: ((cheapest.totalFeeUsd - fee.totalFeeUsd) / cheapest.totalFeeUsd) * 100,
        time: gasPrice ? estimateTransactionTime(currentGasPrice, gasPrice) : 30,
        isBest: fee.protocolId === cheapest.protocolId,
      };
    });
  }, [fees, gasPrice, currentGasPrice, amount]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
              Compare Gas Fees
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Find the cheapest way to swap your tokens
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
          <Card padding="md" className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
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
                  {Object.values(TOKENS).map((token) => (
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
                {Object.values(TOKENS).map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleCompare}
              disabled={feesLoading || gasLoading}
              className="w-full"
            >
              {feesLoading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Comparing...
                </span>
              ) : (
                'Compare Protocols'
              )}
            </Button>
          </div>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Fee Comparison
              </h2>
              <button
                onClick={refetchFees}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>

            {results.map((result) => (
              <Card key={result.protocol} padding="lg" hover>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        {result.protocol}
                      </h3>
                      {result.isBest && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Best Deal
                        </span>
                      )}
                      {result.savings < 0 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                          +{formatCurrency(Math.abs(result.savings))} more
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Gas Fee</p>
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                          {result.gasFee.toFixed(6)} ETH
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Protocol Fee</p>
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                          {result.protocolFee.toFixed(6)} ETH
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Est. Time</p>
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                          ~{result.time}s
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                      Total Cost
                    </p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                      {formatCurrency(result.totalUsd)}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {result.total.toFixed(6)} ETH
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {compareEnabled && results.length === 0 && !feesLoading && (
          <Card padding="lg" className="text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              No results found. Try adjusting your search parameters.
            </p>
          </Card>
        )}

        <Card padding="md" className="mt-8">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Gas prices are estimates based on current network conditions and may vary. Always verify the final transaction details before confirming.
          </p>
        </Card>
      </div>
    </div>
  );
}
