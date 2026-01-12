export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: number;
  gasPrice: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
}

export interface SwapTransaction extends Transaction {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  protocol: string;
  slippage: number;
}

export interface TransactionEstimate {
  gasLimit: number;
  gasPriceGwei: number;
  estimatedCostUsd: number;
  estimatedTime: number; // in seconds
}
