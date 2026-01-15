/**
 * Protocol-Token Compatibility Mapping
 *
 * Defines which tokens are supported by each protocol.
 * This is used to filter out protocols that don't support a given token pair.
 */

import { ETH_ADDRESS, WETH_ADDRESS, USDC_ADDRESS, USDT_ADDRESS, DAI_ADDRESS } from './tokens';

// Token categories for easier management
const STABLECOIN_ADDRESSES = [
  USDC_ADDRESS,
  USDT_ADDRESS,
  DAI_ADDRESS,
  '0x853d955aCEf822Db058eb8505911ED77F175b99e', // FRAX
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53', // BUSD
  '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd', // GUSD
];

const MAJOR_TOKEN_ADDRESSES = [
  ETH_ADDRESS,
  WETH_ADDRESS,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
  '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', // MATIC
  '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', // BNB
];

const DEFI_TOKEN_ADDRESSES = [
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI
  '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', // AAVE
  '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', // MKR
  '0xc00e94Cb662C3520282E6f5717214004A7f26888', // COMP
  '0xD533a949740bb3306d119CC777fa900bA034cd52', // CRV
  '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F', // SNX
  '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', // YFI
  '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', // SUSHI
  '0xba100000625a3754423978a60c9317c58a424e3D', // BAL
];

const ALL_POPULAR_TOKENS = [
  ...STABLECOIN_ADDRESSES,
  ...MAJOR_TOKEN_ADDRESSES,
  ...DEFI_TOKEN_ADDRESSES,
  // Add commonly traded tokens
  '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', // SHIB
  '0x6982508145454Ce325dDbE47a25d4ec3d2311933', // PEPE
  '0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E', // FLOKI
  '0x4d224452801ACEd8B2F0aebE155379bb5D594381', // APE
];

/**
 * Protocol Token Support Matrix
 *
 * Key: Protocol name (must match protocol names in your app)
 * Value: Array of supported token addresses (lowercase)
 */
export const PROTOCOL_TOKEN_SUPPORT: Record<string, string[]> = {
  // Uniswap V3 - Supports almost all tokens with liquidity
  'uniswap-v3': ALL_POPULAR_TOKENS.map(addr => addr.toLowerCase()),

  // Uniswap V2 - Supports most tokens
  'uniswap-v2': ALL_POPULAR_TOKENS.map(addr => addr.toLowerCase()),

  // Curve - Specializes in stablecoins and some major tokens
  'curve': [
    ...STABLECOIN_ADDRESSES,
    ETH_ADDRESS,
    WETH_ADDRESS,
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
  ].map(addr => addr.toLowerCase()),

  // Balancer - Supports major tokens and DeFi tokens
  'balancer': [
    ...STABLECOIN_ADDRESSES,
    ...MAJOR_TOKEN_ADDRESSES,
    ...DEFI_TOKEN_ADDRESSES,
  ].map(addr => addr.toLowerCase()),

  // SushiSwap - Similar to Uniswap, supports most tokens
  'sushiswap': ALL_POPULAR_TOKENS.map(addr => addr.toLowerCase()),

  // 1inch - Aggregator, supports all tokens (it routes through other DEXs)
  '1inch': ALL_POPULAR_TOKENS.map(addr => addr.toLowerCase()),

  // 0x - Aggregator, supports all tokens
  '0x': ALL_POPULAR_TOKENS.map(addr => addr.toLowerCase()),

  // Chainflip - Cross-chain bridge, limited token support (only major assets)
  'chainflip': [
    ETH_ADDRESS,
    WETH_ADDRESS,
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
    USDC_ADDRESS,
    USDT_ADDRESS,
    DAI_ADDRESS,
    // Chainflip only supports major cross-chain assets, not BNB, meme coins, etc.
  ].map(addr => addr.toLowerCase()),

  // Relay - Cross-chain bridge, limited to major tokens
  'relay': [
    ETH_ADDRESS,
    WETH_ADDRESS,
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
    USDC_ADDRESS,
    USDT_ADDRESS,
    DAI_ADDRESS,
  ].map(addr => addr.toLowerCase()),
};

/**
 * Check if a protocol supports a specific token
 */
export function protocolSupportsToken(protocol: string, tokenAddress: string): boolean {
  const supportedTokens = PROTOCOL_TOKEN_SUPPORT[protocol.toLowerCase()];
  if (!supportedTokens) {
    // If protocol not in our list, be conservative and only allow major tokens + stablecoins
    // This prevents showing protocols for unsupported exotic tokens
    const safelist = [
      ...STABLECOIN_ADDRESSES,
      ETH_ADDRESS,
      WETH_ADDRESS,
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
    ].map(addr => addr.toLowerCase());

    return safelist.includes(tokenAddress.toLowerCase());
  }

  return supportedTokens.includes(tokenAddress.toLowerCase());
}

/**
 * Check if a protocol supports a token pair
 */
export function protocolSupportsTokenPair(
  protocol: string,
  fromToken: string,
  toToken: string
): boolean {
  return (
    protocolSupportsToken(protocol, fromToken) &&
    protocolSupportsToken(protocol, toToken)
  );
}

/**
 * Get all protocols that support a given token pair
 */
export function getProtocolsForTokenPair(
  fromToken: string,
  toToken: string
): string[] {
  return Object.keys(PROTOCOL_TOKEN_SUPPORT).filter(protocol =>
    protocolSupportsTokenPair(protocol, fromToken, toToken)
  );
}

/**
 * Get a user-friendly message for why a protocol doesn't support a pair
 */
export function getUnsupportedPairMessage(
  protocol: string,
  fromToken: string,
  toToken: string
): string {
  const supportsFrom = protocolSupportsToken(protocol, fromToken);
  const supportsTo = protocolSupportsToken(protocol, toToken);

  if (!supportsFrom && !supportsTo) {
    return `${protocol} doesn't support either token in this pair`;
  } else if (!supportsFrom) {
    return `${protocol} doesn't support the source token`;
  } else if (!supportsTo) {
    return `${protocol} doesn't support the destination token`;
  }

  return `This pair is not available on ${protocol}`;
}
