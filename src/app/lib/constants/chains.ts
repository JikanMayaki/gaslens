import { Chain } from '@/types/protocol';

export const ETHEREUM: Chain = {
  id: 1,
  name: 'Ethereum',
  nativeCurrency: 'ETH',
  rpcUrl: 'https://eth.llamarpc.com',
  explorerUrl: 'https://etherscan.io',
  logoUrl: '/chains/ethereum.png'
};

export const POLYGON: Chain = {
  id: 137,
  name: 'Polygon',
  nativeCurrency: 'MATIC',
  rpcUrl: 'https://polygon-rpc.com',
  explorerUrl: 'https://polygonscan.com',
  logoUrl: '/chains/polygon.png'
};

export const ARBITRUM: Chain = {
  id: 42161,
  name: 'Arbitrum',
  nativeCurrency: 'ETH',
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
  explorerUrl: 'https://arbiscan.io',
  logoUrl: '/chains/arbitrum.png'
};

export const OPTIMISM: Chain = {
  id: 10,
  name: 'Optimism',
  nativeCurrency: 'ETH',
  rpcUrl: 'https://mainnet.optimism.io',
  explorerUrl: 'https://optimistic.etherscan.io',
  logoUrl: '/chains/optimism.png'
};

export const BASE: Chain = {
  id: 8453,
  name: 'Base',
  nativeCurrency: 'ETH',
  rpcUrl: 'https://mainnet.base.org',
  explorerUrl: 'https://basescan.org',
  logoUrl: '/chains/base.png'
};

export const SUPPORTED_CHAINS: Chain[] = [
  ETHEREUM,
  POLYGON,
  ARBITRUM,
  OPTIMISM,
  BASE
];

export const getChainById = (id: number): Chain | undefined => {
  return SUPPORTED_CHAINS.find(chain => chain.id === id);
};