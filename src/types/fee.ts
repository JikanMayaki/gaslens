export interface GasPrice {
  slow: number;
  standard: number;
  fast: number;
  instant: number;
  timestamp: number;
}

export interface FeeBreakdown {
  gasFeeUsd: number;
  protocolFeeBps: number;
  protocolFeeUsd: number;
  totalFeeUsd: number;
}

export interface FeeComparison {
  protocolId: string;
  protocolName: string;
  feeBreakdown: FeeBreakdown;
  savingsUsd: number;
  savingsPercent: number;
  estimatedTime: number;
}

export interface FeeAlert {
  id: string;
  userId: string;
  threshold: number;
  type: 'below' | 'above';
  active: boolean;
  createdAt: number;
}

export interface GasPriceHistory {
  timestamp: number;
  slow: number;
  standard: number;
  fast: number;
  instant: number;
}

export interface BestTimeToSwap {
  recommendedTime: string; // Human-readable time
  expectedGasPrice: number; // Expected gas price in gwei
  savingsPercentage: number; // Percentage savings compared to current
  reason: string; // Why this is the best time
  currentGasPrice: number; // Current gas price for comparison
}
