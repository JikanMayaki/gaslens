import { Chain } from '@/types/protocol';

export const ETHEREUM: Chain = {
  id: 1,
  name: 'Ethereum',
  nativeCurrency: 'ETH',
  rpcUrl: 'https://eth.llamarpc.com',
  explorerUrl: 'https://etherscan.io',
  logoUrl: '/chains/ethereum.png'
};

export const SUPPORTED_CHAINS: Chain[] = [
  ETHEREUM
  // Add more chains in Phase 4
];

export const getChainById = (id: number): Chain | undefined => {
  return SUPPORTED_CHAINS.find(chain => chain.id === id);
};