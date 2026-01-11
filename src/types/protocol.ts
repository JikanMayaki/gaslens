export interface Protocol {
  id: string;
  name: string;
  type: 'dex' | 'lending' | 'yield';
  chain: string;
  logo: string;
  website: string;
  description: string;
  audited: boolean;
  active: boolean;
}

export interface ProtocolFee {
  protocolId: string;
  protocolName: string;
  baseFeeBps: number; // basis points (1 bps = 0.01%)
  gasEstimate: number; // in gas units
  totalFeeUsd: number;
}
