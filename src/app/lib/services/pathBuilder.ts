import { SwapPath, PathStep } from '@/types/path';
import { ProtocolFee } from '@/types/protocol';
import { protocolSupportsTokenPair } from '../constants/protocolTokens';
import { getTokenBySymbol } from '../constants/tokens';

/**
 * Deep link URL builders for each protocol
 * SECURITY FIX: Added URL encoding to prevent injection attacks
 */
export const PROTOCOL_DEEP_LINKS = {
  'uniswap-v3': (tokenIn: string, tokenOut: string, amount: string) => {
    const tokenInAddress = getTokenAddress(tokenIn);
    const tokenOutAddress = getTokenAddress(tokenOut);
    return `https://app.uniswap.org/#/swap?inputCurrency=${encodeURIComponent(tokenInAddress)}&outputCurrency=${encodeURIComponent(tokenOutAddress)}&exactAmount=${encodeURIComponent(amount)}`;
  },

  curve: (tokenIn: string, tokenOut: string, amount: string) => {
    return `https://curve.fi/#/ethereum/swap?from=${encodeURIComponent(tokenIn)}&to=${encodeURIComponent(tokenOut)}&amount=${encodeURIComponent(amount)}`;
  },

  sushiswap: (tokenIn: string, tokenOut: string, amount: string) => {
    const tokenInAddress = getTokenAddress(tokenIn);
    const tokenOutAddress = getTokenAddress(tokenOut);
    return `https://www.sushi.com/swap?fromCurrency=${encodeURIComponent(tokenInAddress)}&toCurrency=${encodeURIComponent(tokenOutAddress)}&fromAmount=${encodeURIComponent(amount)}`;
  },

  chainflip: (tokenIn: string, tokenOut: string, amount: string) => {
    return `https://swap.chainflip.io/?from=${encodeURIComponent(tokenIn)}&to=${encodeURIComponent(tokenOut)}&amount=${encodeURIComponent(amount)}`;
  },

  relay: (tokenIn: string, tokenOut: string, amount: string) => {
    return `https://relay.link/swap?from=${encodeURIComponent(tokenIn)}&to=${encodeURIComponent(tokenOut)}&amount=${encodeURIComponent(amount)}`;
  },

  '1inch': (tokenIn: string, tokenOut: string, amount: string) => {
    const tokenInAddress = getTokenAddress(tokenIn);
    const tokenOutAddress = getTokenAddress(tokenOut);
    return `https://app.1inch.io/#/1/simple/swap/${encodeURIComponent(tokenInAddress)}/${encodeURIComponent(tokenOutAddress)}?sourceTokenAmount=${encodeURIComponent(amount)}`;
  },

  matcha: (tokenIn: string, tokenOut: string, amount: string) => {
    const tokenInAddress = getTokenAddress(tokenIn);
    const tokenOutAddress = getTokenAddress(tokenOut);
    return `https://matcha.xyz/tokens/ethereum/${encodeURIComponent(tokenOutAddress)}?sellAmount=${encodeURIComponent(amount)}&sellToken=${encodeURIComponent(tokenInAddress)}`;
  },
};

/**
 * Get token contract address or symbol
 */
function getTokenAddress(symbol: string): string {
  const addresses: Record<string, string> = {
    ETH: 'ETH',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  };
  return addresses[symbol] || symbol;
}

/**
 * Build swap paths from protocol fees
 */
export function buildSwapPaths(
  protocolFees: ProtocolFee[],
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  ethPrice: number
): SwapPath[] {
  // Get token addresses for filtering
  const tokenInData = getTokenBySymbol(tokenIn);
  const tokenOutData = getTokenBySymbol(tokenOut);

  const tokenInAddress = tokenInData?.address || tokenIn;
  const tokenOutAddress = tokenOutData?.address || tokenOut;

  // Filter protocols that support this token pair
  const supportedProtocolFees = protocolFees.filter((fee) =>
    protocolSupportsTokenPair(fee.protocolId, tokenInAddress, tokenOutAddress)
  );

  // Build direct protocol paths (only for supported protocols)
  const directPaths: SwapPath[] = supportedProtocolFees.map((fee) => {
    const protocol = fee.protocolId;
    const protocolName = fee.protocolName;

    const step: PathStep = {
      action: 'swap',
      protocol: protocolName,
      from: tokenIn,
      to: tokenOut,
    };

    const gasFeeUsd = (fee.gasEstimate * parseFloat(amountIn) * ethPrice) / 1e9;
    const protocolFeeUsd = fee.totalFeeUsd - gasFeeUsd;

    // Estimate output (simplified - in production use real quotes)
    const amount = parseFloat(amountIn);
    const estimatedOutput = amount * ethPrice * (1 - fee.baseFeeBps / 10000);

    // Get deep link
    const linkBuilder = PROTOCOL_DEEP_LINKS[protocol as keyof typeof PROTOCOL_DEEP_LINKS];
    const url = linkBuilder
      ? linkBuilder(tokenIn, tokenOut, amountIn)
      : `https://${protocolName.toLowerCase().replace(/\s/g, '')}.com`;

    // Determine MEV risk
    const mevRisk = getMevRisk(protocol);

    // Time estimate based on gas usage
    const timeEstimate = fee.gasEstimate > 140000 ? '~45 seconds' : '~30 seconds';

    return {
      id: `${protocol}-direct`,
      name: `Direct Swap on ${protocolName}`,
      type: 'direct',
      steps: [step],
      totalCost: {
        gasFeeUsd,
        protocolFeeUsd,
        totalUsd: fee.totalFeeUsd,
      },
      estimatedOutput,
      timeEstimate,
      mevRisk,
      action: {
        label: `Swap on ${protocolName}`,
        url,
        provider: protocolName,
      },
    };
  });

  // Add aggregated paths (1inch, Matcha) - only if they support the pair
  const aggregatedPaths = buildAggregatedPaths(
    tokenIn,
    tokenOut,
    amountIn,
    ethPrice,
    tokenInAddress,
    tokenOutAddress
  );

  // Combine all paths
  const allPaths = [...directPaths, ...aggregatedPaths];

  // Sort by total cost (cheapest first)
  allPaths.sort((a, b) => a.totalCost.totalUsd - b.totalCost.totalUsd);

  // Calculate savings and mark best option
  const mostExpensive = allPaths[allPaths.length - 1];
  allPaths.forEach((path, index) => {
    path.savingsUsd = mostExpensive.totalCost.totalUsd - path.totalCost.totalUsd;
    path.savingsPercent = (path.savingsUsd / mostExpensive.totalCost.totalUsd) * 100;
    path.isBest = index === 0;
  });

  return allPaths;
}

/**
 * Build aggregated swap paths (1inch, Matcha)
 */
function buildAggregatedPaths(
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  ethPrice: number,
  tokenInAddress: string,
  tokenOutAddress: string
): SwapPath[] {
  const amount = parseFloat(amountIn);

  const paths: SwapPath[] = [];

  // 1inch - add only if it supports the pair
  if (protocolSupportsTokenPair('1inch', tokenInAddress, tokenOutAddress)) {
    paths.push(
    {
      id: '1inch-aggregated',
      name: '1inch Optimized Route',
      type: 'aggregated',
      steps: [
        {
          action: 'swap',
          protocol: '1inch',
          from: tokenIn,
          to: tokenOut,
          note: 'Split across multiple pools for best price',
        },
      ],
      totalCost: {
        gasFeeUsd: 28.0,
        protocolFeeUsd: 1.4,
        totalUsd: 29.4,
      },
      estimatedOutput: amount * ethPrice * 0.9993, // Slightly better than some protocols
      timeEstimate: '~45 seconds',
      mevRisk: 'medium',
      action: {
        label: 'Use 1inch',
        url: PROTOCOL_DEEP_LINKS['1inch'](tokenIn, tokenOut, amountIn),
        provider: '1inch Network',
      },
    });
  }

  // Matcha (0x) - add only if it supports the pair
  if (protocolSupportsTokenPair('0x', tokenInAddress, tokenOutAddress)) {
    paths.push({
      id: 'matcha-aggregated',
      name: 'Matcha 0x Route',
      type: 'aggregated',
      steps: [
        {
          action: 'swap',
          protocol: 'Matcha',
          from: tokenIn,
          to: tokenOut,
          note: 'Sourced from 0x liquidity',
        },
      ],
      totalCost: {
        gasFeeUsd: 32.0,
        protocolFeeUsd: 0.8,
        totalUsd: 32.8,
      },
      estimatedOutput: amount * ethPrice * 0.9996, // MEV protection gives better price
      timeEstimate: '~40 seconds',
      mevRisk: 'low',
      action: {
        label: 'Use Matcha',
        url: PROTOCOL_DEEP_LINKS.matcha(tokenIn, tokenOut, amountIn),
        provider: 'Matcha (0x)',
      },
    });
  }

  return paths;
}

/**
 * Determine MEV risk level for a protocol
 */
function getMevRisk(protocolId: string): 'low' | 'medium' | 'high' {
  const lowRisk = ['curve', 'chainflip', 'relay'];
  const mediumRisk = ['uniswap-v3', 'sushiswap', '1inch'];

  if (lowRisk.includes(protocolId)) return 'low';
  if (mediumRisk.includes(protocolId)) return 'medium';
  return 'high';
}

/**
 * Format savings for display
 */
export function formatSavings(savingsUsd: number, savingsPercent: number): string {
  if (savingsUsd < 0.01) return 'No savings';
  return `Save $${savingsUsd.toFixed(2)} (${savingsPercent.toFixed(1)}%)`;
}
