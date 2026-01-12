import { Token } from '@/types/transaction';

// Ethereum mainnet token addresses
export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
export const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
export const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

export const POPULAR_TOKENS: Token[] = [
  {
    address: ETH_ADDRESS,
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    logoUrl: '/tokens/eth.png'
  },
  {
    address: USDC_ADDRESS,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoUrl: '/tokens/usdc.png'
  },
  {
    address: USDT_ADDRESS,
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    logoUrl: '/tokens/usdt.png'
  },
  {
    address: DAI_ADDRESS,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    logoUrl: '/tokens/dai.png'
  },
  {
    address: WETH_ADDRESS,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    logoUrl: '/tokens/weth.png'
  }
];

export const getTokenByAddress = (address: string): Token | undefined => {
  return POPULAR_TOKENS.find(
    token => token.address.toLowerCase() === address.toLowerCase()
  );
};

export const getTokenBySymbol = (symbol: string): Token | undefined => {
  return POPULAR_TOKENS.find(
    token => token.symbol.toLowerCase() === symbol.toLowerCase()
  );
};

// Alias for easier imports
export const TOKENS = POPULAR_TOKENS;