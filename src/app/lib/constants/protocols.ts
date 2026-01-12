import { Protocol } from '@/types/protocol';
import { ETHEREUM } from './chains';

export const UNISWAP: Protocol = {
  id: 'uniswap-v3',
  name: 'Uniswap V3',
  type: 'dex',
  chain: ETHEREUM.name,
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
  chain: ETHEREUM.name,
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
  chain: ETHEREUM.name,
  logoUrl: '/protocols/curve.png',
  website: 'https://curve.fi',
  description: 'Stablecoin-focused automated market maker',
  audited: true,
  active: true
};

export const CHAINFLIP: Protocol = {
  id: 'chainflip',
  name: 'Chainflip',
  type: 'dex',
  chain: ETHEREUM.name,
  logoUrl: '/protocols/chainflip.png',
  website: 'https://chainflip.io',
  description: 'Cross-chain DEX with automated market making',
  audited: true,
  active: true
};

export const RELAY: Protocol = {
  id: 'relay',
  name: 'Relay',
  type: 'dex',
  chain: ETHEREUM.name,
  logoUrl: '/protocols/relay.png',
  website: 'https://relay.link',
  description: 'Fast and efficient cross-chain token swaps',
  audited: true,
  active: true
};

export const SUPPORTED_PROTOCOLS: Protocol[] = [
  UNISWAP,
  SUSHISWAP,
  CURVE,
  CHAINFLIP,
  RELAY
];

// Alias for easier imports
export const PROTOCOLS = SUPPORTED_PROTOCOLS;

export const getProtocolById = (id: string): Protocol | undefined => {
  return SUPPORTED_PROTOCOLS.find(protocol => protocol.id === id);
};