import type { SwapQuote, ApiResponse } from '@/types/api';
import type { ProtocolFee } from '@/types/protocol';

const ONEINCH_API_KEY = process.env.NEXT_PUBLIC_1INCH_API_KEY;
const ONEINCH_BASE_URL = 'https://api.1inch.dev/swap/v6.0/1';

/**
 * Fetch swap quote from 1inch
 */
export async function fetch1inchQuote(
  fromToken: string,
  toToken: string,
  amount: string
): Promise<ApiResponse<SwapQuote>> {
  try {
    const params = new URLSearchParams({
      src: fromToken,
      dst: toToken,
      amount: amount,
      includeGas: 'true',
    });

    const response = await fetch(`${ONEINCH_BASE_URL}/quote?${params}`, {
      headers: {
        Authorization: `Bearer ${ONEINCH_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`1inch API error: ${response.statusText}`);
    }

    const data = await response.json();

    const quote: SwapQuote = {
      protocol: '1inch',
      tokenIn: fromToken,
      tokenOut: toToken,
      amountIn: amount,
      amountOut: data.toAmount,
      gasEstimate: parseInt(data.gas || '150000'),
      priceImpact: parseFloat(data.priceImpact || '0'),
      route: data.protocols?.[0]?.map((p: any) => p.name) || [],
    };

    return {
      data: quote,
      success: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error fetching 1inch quote:', error);

    return {
      data: getMockQuote(fromToken, toToken, amount),
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now(),
    };
  }
}

/**
 * Get protocol fee estimates for major DEXes
 */
export async function getProtocolFees(
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  currentGasPrice: number
): Promise<ProtocolFee[]> {
  // These are typical fee structures for major protocols
  const protocols = [
    {
      protocolId: 'uniswap-v3',
      protocolName: 'Uniswap V3',
      baseFeeBps: 30, // 0.3%
      gasEstimate: 150000,
    },
    {
      protocolId: 'sushiswap',
      protocolName: 'SushiSwap',
      baseFeeBps: 30, // 0.3%
      gasEstimate: 145000,
    },
    {
      protocolId: 'curve',
      protocolName: 'Curve',
      baseFeeBps: 4, // 0.04%
      gasEstimate: 120000,
    },
    {
      protocolId: 'chainflip',
      protocolName: 'Chainflip',
      baseFeeBps: 10, // 0.1%
      gasEstimate: 135000,
    },
    {
      protocolId: 'relay',
      protocolName: 'Relay',
      baseFeeBps: 15, // 0.15%
      gasEstimate: 130000,
    },
  ];

  // Calculate total fees (simplified - would need real quote data)
  const amount = parseFloat(amountIn);
  const ethPrice = 2000; // Mock ETH price in USD

  return protocols.map(protocol => {
    const protocolFeeAmount = (amount * protocol.baseFeeBps) / 10000;
    const gasCostEth = (protocol.gasEstimate * currentGasPrice) / 1e9;
    const gasCostUsd = gasCostEth * ethPrice;
    const protocolFeeUsd = protocolFeeAmount * ethPrice;

    return {
      ...protocol,
      totalFeeUsd: gasCostUsd + protocolFeeUsd,
    };
  });
}

/**
 * Mock quote data for development
 */
function getMockQuote(fromToken: string, toToken: string, amount: string): SwapQuote {
  return {
    protocol: '1inch',
    tokenIn: fromToken,
    tokenOut: toToken,
    amountIn: amount,
    amountOut: (parseFloat(amount) * 1800).toString(), // Mock conversion
    gasEstimate: 150000,
    priceImpact: 0.15,
    route: ['Uniswap V3'],
  };
}

/**
 * Get best route across all protocols
 */
export async function getBestRoute(
  fromToken: string,
  toToken: string,
  amount: string,
  gasPrice: number
): Promise<ProtocolFee | null> {
  const fees = await getProtocolFees(fromToken, toToken, amount, gasPrice);

  if (fees.length === 0) return null;

  // Sort by total fee (lowest first)
  fees.sort((a, b) => a.totalFeeUsd - b.totalFeeUsd);

  return fees[0];
}
