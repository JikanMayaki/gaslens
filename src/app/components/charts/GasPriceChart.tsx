'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

interface GasPriceDataPoint {
  time: string;
  slow: number;
  standard: number;
  fast: number;
}

interface GasPriceChartProps {
  data: GasPriceDataPoint[];
  title?: string;
}

export function GasPriceChart({ data, title = 'Gas Price Trends' }: GasPriceChartProps) {
  return (
    <Card padding="lg">
      <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis
            dataKey="time"
            className="text-xs text-zinc-600 dark:text-zinc-400"
            stroke="currentColor"
          />
          <YAxis
            className="text-xs text-zinc-600 dark:text-zinc-400"
            stroke="currentColor"
            label={{ value: 'Gwei', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#18181b' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="slow"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Slow"
          />
          <Line
            type="monotone"
            dataKey="standard"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Standard"
          />
          <Line
            type="monotone"
            dataKey="fast"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Fast"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
