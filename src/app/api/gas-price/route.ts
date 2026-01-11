import { NextResponse } from 'next/server';
import type { GasPrice } from '@/types/fee';

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/api';

export async function GET() {
  try {
    const response = await fetch(
      `${ETHERSCAN_BASE_URL}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`,
      { next: { revalidate: 12 } } // Cache for 12 seconds
    );

    if (!response.ok) {
      throw new Error(`Etherscan API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== '1') {
      throw new Error(data.message || 'Failed to fetch gas prices');
    }

    const result = data.result;

    const gasPrice: GasPrice = {
      slow: parseFloat(result.SafeGasPrice),
      standard: parseFloat(result.ProposeGasPrice),
      fast: parseFloat(result.FastGasPrice),
      instant: parseFloat(result.FastGasPrice) * 1.2,
      timestamp: Date.now(),
    };

    return NextResponse.json({
      data: gasPrice,
      success: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error fetching gas prices:', error);

    // Return mock data on error
    return NextResponse.json(
      {
        data: {
          slow: 25,
          standard: 35,
          fast: 45,
          instant: 55,
          timestamp: Date.now(),
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      },
      { status: 500 }
    );
  }
}
