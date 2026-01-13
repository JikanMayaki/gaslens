'use client';

import React from 'react';
import { SwapPath } from '@/types/path';
import { Card } from './ui/Card';
import { ArrowRight, Shield, Zap, ExternalLink } from 'lucide-react';

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
      className={`relative ${path.isBest ? 'border-2 border-green-500 shadow-lg' : ''}`}
      padding="lg"
    >
      {/* Best Badge */}
      {path.isBest && (
        <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Zap className="w-4 h-4" />
          Best Route - Save ${path.savingsUsd?.toFixed(2)}
        </div>
      )}

      {/* Rank Badge */}
      <div className="absolute -top-3 right-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white dark:border-zinc-900">
        #{rank}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-2">
        {/* Left side - Path info */}
        <div className="flex-1">
          {/* Path name and type */}
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {path.name}
          </h3>

          {/* Steps visualization */}
          <div className="flex items-center gap-2 mb-3 text-sm text-zinc-600 dark:text-zinc-400 flex-wrap">
            {path.steps.map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ArrowRight className="w-4 h-4" />}
                <span className="font-medium">{step.protocol}</span>
              </React.Fragment>
            ))}
            {path.steps[0].note && (
              <span className="text-xs text-zinc-500 dark:text-zinc-500 ml-2">
                ({path.steps[0].note})
              </span>
            )}
          </div>

          {/* Cost breakdown */}
          <div className="space-y-1 text-sm mb-3">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Gas Fee:</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                ${path.totalCost.gasFeeUsd.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Protocol Fee:</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                ${path.totalCost.protocolFeeUsd.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-zinc-200 dark:border-zinc-700">
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">Total Cost:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">
                ${path.totalCost.totalUsd.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {path.mevRisk === 'low' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                <Shield className="w-3 h-3" />
                MEV Protected
              </span>
            )}
            {path.mevRisk === 'medium' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs font-medium">
                <Shield className="w-3 h-3" />
                Medium MEV Risk
              </span>
            )}
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
              {path.timeEstimate}
            </span>
            {path.type === 'aggregated' && (
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                Aggregated
              </span>
            )}
          </div>
        </div>

        {/* Right side - Action button */}
        <div className="flex flex-col justify-center items-center md:items-end gap-2 min-w-[180px]">
          <button
            onClick={handleClick}
            className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              path.isBest
                ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-lg'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            {path.action.label}
            <ExternalLink className="w-4 h-4" />
          </button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            via {path.action.provider}
          </p>
        </div>
      </div>
    </Card>
  );
}
