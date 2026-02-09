import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client (read-only for checking subscription status)
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client (full admin access for API routes)
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase service role key');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

// Database types
export interface Subscription {
  id: string;
  wallet_address: string;
  tx_hash: string;
  chain_id: number;
  tier: 'Pro' | 'Enterprise';
  amount_usd: number;
  currency: 'ETH' | 'USDC';
  block_number: number;
  created_at: string;
  is_active: boolean;
}

export interface PaymentAttempt {
  id: string;
  wallet_address: string;
  tx_hash: string;
  ip_address: string | null;
  success: boolean;
  error_message: string | null;
  attempted_at: string;
}
