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
