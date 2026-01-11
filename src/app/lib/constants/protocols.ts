import { Protocol } from '@/types/protocol';
import { ETHEREUM } from './chains';

export const UNISWAP: Protocol = {
  id: 'uniswap-v3',
  name: 'Uniswap V3',
  type: 'dex',
  chain: ETHEREUM,
  logoUrl: '/protocols/uniswap.png',
  website: 'https://uniswap.org',
  description: 'Leading decentralized exchange with concentrated liquidity',
  audited: true,
  active: true
};

export const SUSHISWAP: Protocol = {
  id: 'sushiswap',
  name: 'SushiSwap',
  type: 'dex',
  chain: ETHEREUM,
  logoUrl: '/protocols/sushiswap.png',
  website: 'https://sushi.com',
  description: 'Community-driven DEX and DeFi platform',
  audited: true,
  active: true
};

export const CURVE: Protocol = {
  id: 'curve',
  name: 'Curve',
  type: 'dex',
  chain: ETHEREUM,
  logoUrl: '/protocols/curve.png',
  website: 'https://curve.fi',
  description: 'Stablecoin-focused automated market maker',
  audited: true,
  active: true
};

export const SUPPORTED_PROTOCOLS: Protocol[] = [
  UNISWAP,
  SUSHISWAP,
  CURVE
  // Add more protocols as we integrate them
];

export const getProtocolById = (id: string): Protocol | undefined => {
  return SUPPORTED_PROTOCOLS.find(protocol => protocol.id === id);
};