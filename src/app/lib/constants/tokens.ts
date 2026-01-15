import { Token } from '@/types/transaction';

// Ethereum mainnet token addresses
export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
export const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
export const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

// Stablecoins
const STABLECOINS: Token[] = [
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
    address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
    symbol: 'FRAX',
    name: 'Frax',
    decimals: 18,
    logoUrl: '/tokens/frax.png'
  },
  {
    address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    symbol: 'BUSD',
    name: 'Binance USD',
    decimals: 18,
    logoUrl: '/tokens/busd.png'
  },
  {
    address: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd',
    symbol: 'GUSD',
    name: 'Gemini Dollar',
    decimals: 2,
    logoUrl: '/tokens/gusd.png'
  }
];

// Major Cryptocurrencies
const MAJOR_TOKENS: Token[] = [
  {
    address: ETH_ADDRESS,
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    logoUrl: '/tokens/eth.png'
  },
  {
    address: WETH_ADDRESS,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    logoUrl: '/tokens/weth.png'
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
    logoUrl: '/tokens/wbtc.png'
  },
  {
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    symbol: 'MATIC',
    name: 'Polygon',
    decimals: 18,
    logoUrl: '/tokens/matic.png'
  },
  {
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    symbol: 'BNB',
    name: 'Binance Coin',
    decimals: 18,
    logoUrl: '/tokens/bnb.png'
  }
];

// DeFi Tokens
const DEFI_TOKENS: Token[] = [
  {
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    symbol: 'UNI',
    name: 'Uniswap',
    decimals: 18,
    logoUrl: '/tokens/uni.png'
  },
  {
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    symbol: 'AAVE',
    name: 'Aave',
    decimals: 18,
    logoUrl: '/tokens/aave.png'
  },
  {
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    symbol: 'LINK',
    name: 'Chainlink',
    decimals: 18,
    logoUrl: '/tokens/link.png'
  },
  {
    address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    symbol: 'MKR',
    name: 'Maker',
    decimals: 18,
    logoUrl: '/tokens/mkr.png'
  },
  {
    address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    symbol: 'COMP',
    name: 'Compound',
    decimals: 18,
    logoUrl: '/tokens/comp.png'
  },
  {
    address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    symbol: 'CRV',
    name: 'Curve DAO Token',
    decimals: 18,
    logoUrl: '/tokens/crv.png'
  },
  {
    address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
    symbol: 'SNX',
    name: 'Synthetix',
    decimals: 18,
    logoUrl: '/tokens/snx.png'
  },
  {
    address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    symbol: 'YFI',
    name: 'yearn.finance',
    decimals: 18,
    logoUrl: '/tokens/yfi.png'
  },
  {
    address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    symbol: 'SUSHI',
    name: 'SushiSwap',
    decimals: 18,
    logoUrl: '/tokens/sushi.png'
  },
  {
    address: '0xba100000625a3754423978a60c9317c58a424e3D',
    symbol: 'BAL',
    name: 'Balancer',
    decimals: 18,
    logoUrl: '/tokens/bal.png'
  }
];

// Layer 2 & Scaling Tokens
const LAYER2_TOKENS: Token[] = [
  {
    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    symbol: 'ARB',
    name: 'Arbitrum',
    decimals: 18,
    logoUrl: '/tokens/arb.png'
  },
  {
    address: '0x4200000000000000000000000000000000000042',
    symbol: 'OP',
    name: 'Optimism',
    decimals: 18,
    logoUrl: '/tokens/op.png'
  },
  {
    address: '0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF',
    symbol: 'IMX',
    name: 'Immutable X',
    decimals: 18,
    logoUrl: '/tokens/imx.png'
  },
  {
    address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    symbol: 'MATIC',
    name: 'Polygon',
    decimals: 18,
    logoUrl: '/tokens/matic.png'
  }
];

// Meme Tokens
const MEME_TOKENS: Token[] = [
  {
    address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    symbol: 'SHIB',
    name: 'Shiba Inu',
    decimals: 18,
    logoUrl: '/tokens/shib.png'
  },
  {
    address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
    symbol: 'PEPE',
    name: 'Pepe',
    decimals: 18,
    logoUrl: '/tokens/pepe.png'
  },
  {
    address: '0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E',
    symbol: 'FLOKI',
    name: 'Floki Inu',
    decimals: 9,
    logoUrl: '/tokens/floki.png'
  },
  {
    address: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
    symbol: 'APE',
    name: 'ApeCoin',
    decimals: 18,
    logoUrl: '/tokens/ape.png'
  }
];

// Exchange Tokens
const EXCHANGE_TOKENS: Token[] = [
  {
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    symbol: 'BNB',
    name: 'Binance Coin',
    decimals: 18,
    logoUrl: '/tokens/bnb.png'
  },
  {
    address: '0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9',
    symbol: 'FTT',
    name: 'FTX Token',
    decimals: 18,
    logoUrl: '/tokens/ftt.png'
  },
  {
    address: '0x75231F58b43240C9718Dd58B4967c5114342a86c',
    symbol: 'OKB',
    name: 'OKB',
    decimals: 18,
    logoUrl: '/tokens/okb.png'
  }
];

// Gaming & Metaverse Tokens
const GAMING_TOKENS: Token[] = [
  {
    address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
    symbol: 'MANA',
    name: 'Decentraland',
    decimals: 18,
    logoUrl: '/tokens/mana.png'
  },
  {
    address: '0x037A54AaB062628C9Bbae1FDB1583c195585fe41',
    symbol: 'SAND',
    name: 'The Sandbox',
    decimals: 18,
    logoUrl: '/tokens/sand.png'
  },
  {
    address: '0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25',
    symbol: 'SLP',
    name: 'Smooth Love Potion',
    decimals: 0,
    logoUrl: '/tokens/slp.png'
  },
  {
    address: '0xf629cBd94d3791C9250152BD8dfBDF380E2a3B9c',
    symbol: 'ENJ',
    name: 'Enjin Coin',
    decimals: 18,
    logoUrl: '/tokens/enj.png'
  },
  {
    address: '0xC581b735A1688071A1746c968e0798D642EDE491',
    symbol: 'GALA',
    name: 'Gala',
    decimals: 8,
    logoUrl: '/tokens/gala.png'
  }
];

// Privacy & Infrastructure
const INFRASTRUCTURE_TOKENS: Token[] = [
  {
    address: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
    symbol: 'SNT',
    name: 'Status',
    decimals: 18,
    logoUrl: '/tokens/snt.png'
  },
  {
    address: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
    symbol: 'GNO',
    name: 'Gnosis',
    decimals: 18,
    logoUrl: '/tokens/gno.png'
  },
  {
    address: '0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8',
    symbol: 'agEUR',
    name: 'Angle Protocol',
    decimals: 18,
    logoUrl: '/tokens/ageur.png'
  }
];

// Other Popular Tokens
const OTHER_TOKENS: Token[] = [
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'LDO',
    name: 'Lido DAO',
    decimals: 18,
    logoUrl: '/tokens/ldo.png'
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'RPL',
    name: 'Rocket Pool',
    decimals: 18,
    logoUrl: '/tokens/rpl.png'
  },
  {
    address: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
    symbol: 'FXS',
    name: 'Frax Share',
    decimals: 18,
    logoUrl: '/tokens/fxs.png'
  },
  {
    address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    symbol: '1INCH',
    name: '1inch',
    decimals: 18,
    logoUrl: '/tokens/1inch.png'
  }
];

// Combined list of all tokens
export const POPULAR_TOKENS: Token[] = [
  ...MAJOR_TOKENS,
  ...STABLECOINS,
  ...DEFI_TOKENS,
  ...LAYER2_TOKENS,
  ...MEME_TOKENS,
  ...EXCHANGE_TOKENS,
  ...GAMING_TOKENS,
  ...INFRASTRUCTURE_TOKENS,
  ...OTHER_TOKENS
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

// Export categories for filtering
export const TOKEN_CATEGORIES = {
  stablecoins: STABLECOINS,
  major: MAJOR_TOKENS,
  defi: DEFI_TOKENS,
  layer2: LAYER2_TOKENS,
  meme: MEME_TOKENS,
  exchange: EXCHANGE_TOKENS,
  gaming: GAMING_TOKENS,
  infrastructure: INFRASTRUCTURE_TOKENS,
  other: OTHER_TOKENS,
};

// Get token count
export const getTokenCount = (): number => POPULAR_TOKENS.length;

// Alias for easier imports
export const TOKENS = POPULAR_TOKENS;