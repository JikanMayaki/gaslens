import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../lib/supabase';

// SECURITY: Only allow access with admin secret key
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;

export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || token !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch subscriptions
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Admin query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subscriptions' },
        { status: 500 }
      );
    }

    // Fetch stats
    const { data: stats, error: statsError } = await supabase
      .from('subscription_stats')
      .select('*')
      .single();

    return NextResponse.json({
      subscriptions,
      stats: stats || {
        total_subscriptions: subscriptions.length,
        active_subscriptions: subscriptions.filter(s => s.is_active).length,
      },
      pagination: {
        limit,
        offset,
        count: subscriptions.length,
      },
    });
  } catch (error: any) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Deactivate a subscription (refund/dispute)
export async function PATCH(request: NextRequest) {
  try {
    // Check admin authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || token !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { walletAddress, isActive } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('subscriptions')
      .update({ is_active: isActive })
      .eq('wallet_address', walletAddress.toLowerCase())
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      subscription: data,
    });
  } catch (error: any) {
    console.error('Admin PATCH error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
