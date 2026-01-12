import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import type { ProtocolFee } from '@/types/protocol';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tokenIn = searchParams.get('tokenIn');
    const tokenOut = searchParams.get('tokenOut');
    const amountIn = searchParams.get('amountIn');
    const gasPrice = parseFloat(searchParams.get('gasPrice') || '35');

    if (!tokenIn || !tokenOut || !amountIn) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'tokenIn, tokenOut, and amountIn are required',
        },
        { status: 400 }
      );
    }

    // Mock protocol fee data (in production, this would call actual DEX APIs)
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

    const amount = parseFloat(amountIn);
    const ethPrice = 2000; // In production, fetch from CoinGecko

    const fees: ProtocolFee[] = protocols.map(protocol => {
      const protocolFeeAmount = (amount * protocol.baseFeeBps) / 10000;
      const gasCostEth = (protocol.gasEstimate * gasPrice) / 1e9;
      const gasCostUsd = gasCostEth * ethPrice;
      const protocolFeeUsd = protocolFeeAmount * ethPrice;

      return {
        ...protocol,
        totalFeeUsd: gasCostUsd + protocolFeeUsd,
      };
    });

    return NextResponse.json({
      data: fees,
      success: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error calculating protocol fees:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to calculate protocol fees',
      },
      { status: 500 }
    );
  }
}
