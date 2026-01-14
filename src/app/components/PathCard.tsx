'use client';

import React from 'react';
import { SwapPath } from '@/types/path';
import { Card } from './ui/Card';
import { ArrowRight, Shield, Zap, ExternalLink, TrendingDown, Clock, AlertTriangle } from 'lucide-react';

interface PathCardProps {
  path: SwapPath;
  rank: number;
}

export function PathCard({ path, rank }: PathCardProps) {
  const handleClick = () => {
    // Track analytics (future implementation)
    console.log('Path clicked:', path.id);

    // Open in new tab
    window.open(path.action.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      className={`relative group ${
        path.isBest
          ? 'border-2 border-green-500 dark:border-green-500 shadow-xl shadow-green-500/20 dark:shadow-green-500/30'
          : 'border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50'
      } transition-all duration-300`}
      padding="lg"
    >
      {/* Best Badge */}
      {path.isBest && (
        <div className="absolute -top-3 left-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-green-500/40">
          <Zap className="w-4 h-4 fill-white" />
          BEST ROUTE · SAVE ${path.savingsUsd?.toFixed(2)}
        </div>
      )}

      {/* Rank Badge */}
      <div className={`absolute -top-3 right-6 ${
        path.isBest
          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
      } w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white dark:border-zinc-900 shadow-md`}>
        #{rank}
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6 mt-2">
        {/* Left side - Path info */}
        <div className="flex-1 space-y-4">
          {/* Path name and type */}
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
              {path.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 flex-wrap">
              {path.steps.map((step, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ArrowRight className="w-4 h-4" />}
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">{step.protocol}</span>
                </React.Fragment>
              ))}
              {path.steps[0].note && (
                <span className="text-xs text-zinc-500 dark:text-zinc-500 italic">
                  · {path.steps[0].note}
                </span>
              )}
            </div>
          </div>

          {/* Cost breakdown with visual bars */}
          <div className="space-y-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Gas Fee</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50 tabular-nums">
                ${path.totalCost.gasFeeUsd.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Protocol Fee</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50 tabular-nums">
                ${path.totalCost.protocolFeeUsd.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t-2 border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-900 dark:text-zinc-50">Total Cost</span>
              <span className={`text-2xl font-black tabular-nums ${
                path.isBest
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-zinc-900 dark:text-zinc-50'
              }`}>
                ${path.totalCost.totalUsd.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {path.mevRisk === 'low' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-lg text-xs font-semibold border border-green-200 dark:border-green-800">
                <Shield className="w-3.5 h-3.5" />
                MEV Protected
              </span>
            )}
            {path.mevRisk === 'medium' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 rounded-lg text-xs font-semibold border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="w-3.5 h-3.5" />
                Medium MEV Risk
              </span>
            )}
            {path.mevRisk === 'high' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-800">
                <AlertTriangle className="w-3.5 h-3.5" />
                High MEV Risk
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold border border-blue-200 dark:border-blue-800">
              <Clock className="w-3.5 h-3.5" />
              {path.timeEstimate}
            </span>
            {path.type === 'aggregated' && (
              <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-semibold border border-purple-200 dark:border-purple-800">
                Aggregated Route
              </span>
            )}
          </div>
        </div>

        {/* Right side - Action button */}
        <div className="flex flex-col justify-between items-stretch lg:items-end gap-3 lg:min-w-[220px]">
          {/* Savings highlight */}
          {path.savingsUsd && path.savingsUsd > 0 && (
            <div className="text-right bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <div className="text-xs text-green-700 dark:text-green-400 font-medium mb-1">
                You Save
              </div>
              <div className="text-2xl font-black text-green-600 dark:text-green-400 tabular-nums">
                ${path.savingsUsd.toFixed(2)}
              </div>
              <div className="text-xs text-green-600 dark:text-green-500 font-semibold">
                {path.savingsPercent?.toFixed(1)}% cheaper
              </div>
            </div>
          )}

          <button
            onClick={handleClick}
            className={`w-full px-6 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
              path.isBest
                ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105'
            }`}
          >
            <span>{path.action.label}</span>
            <ExternalLink className="w-5 h-5" />
          </button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center lg:text-right font-medium">
            Powered by {path.action.provider}
          </p>
        </div>
      </div>
    </Card>
  );
}
