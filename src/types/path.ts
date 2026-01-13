export interface PathStep {
  action: 'swap' | 'bridge' | 'wrap';
  protocol: string;
  from: string;
  to: string;
  note?: string;
}

export interface PathCost {
  gasFeeUsd: number;
  protocolFeeUsd: number;
  totalUsd: number;
}

export interface PathAction {
  label: string;
  url: string;
  provider: string;
}

export interface SwapPath {
  id: string;
  name: string;
  type: 'direct' | 'aggregated' | 'bridge' | 'split';

  steps: PathStep[];

  totalCost: PathCost;

  estimatedOutput: number; // How much output token you'll get
  timeEstimate: string; // "~30 seconds"
  mevRisk: 'low' | 'medium' | 'high';

  action: PathAction;

  // For ranking and display
  savingsUsd?: number; // Compared to most expensive path
  savingsPercent?: number;
  isBest?: boolean;
}
