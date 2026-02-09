import { NextRequest, NextResponse } from 'next/server';
import { createBrowserClient } from '../../../lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('wallet');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address required' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    const supabase = createBrowserClient();

    // Check for active subscription
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('tier, created_at, tx_hash')
      .eq('wallet_address', walletAddress.toLowerCase())
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" which is OK
      console.error('Subscription check error:', error);
      return NextResponse.json(
        { error: 'Failed to check subscription' },
        { status: 500 }
      );
    }

    if (!subscription) {
      return NextResponse.json({
        hasPro: false,
        tier: 'Free',
      });
    }

    return NextResponse.json({
      hasPro: true,
      tier: subscription.tier,
      since: subscription.created_at,
      accessType: 'lifetime',
    });
  } catch (error: any) {
    console.error('Subscription status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check subscription' },
      { status: 500 }
    );
  }
}
