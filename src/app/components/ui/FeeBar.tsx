'use client';

import { useState, useEffect } from 'react';

interface FeeBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  isBest?: boolean;
}

export function FeeBar({ label, value, maxValue, color, isBest = false }: FeeBarProps) {
  const [width, setWidth] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    // Animate bar on mount
    const timer = setTimeout(() => setWidth(percentage), 50);
    return () => clearTimeout(timer);
  }, [percentage]);

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  const bgColorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/20',
    green: 'bg-green-100 dark:bg-green-900/20',
    purple: 'bg-purple-100 dark:bg-purple-900/20',
    orange: 'bg-orange-100 dark:bg-orange-900/20',
    red: 'bg-red-100 dark:bg-red-900/20',
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
          {isBest && (
            <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-semibold">
              BEST
            </span>
          )}
        </span>
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
          ${value.toFixed(2)}
        </span>
      </div>
      <div className={`h-3 rounded-full ${bgColorClasses[color]} overflow-hidden`}>
        <div
          className={`h-full rounded-full ${colorClasses[color]} transition-all duration-1000 ease-out shadow-md`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
