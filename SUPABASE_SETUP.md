# Supabase Database Setup

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Create a new project (Free tier is fine to start)
3. Note your Project URL and anon/public key

## 2. Run This SQL in Supabase SQL Editor

```sql
-- Enable Row Level Security
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address VARCHAR(42) NOT NULL UNIQUE,
  tx_hash VARCHAR(66) NOT NULL UNIQUE,
  chain_id INTEGER NOT NULL,
  tier VARCHAR(20) NOT NULL,
  amount_usd DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  block_number BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Lifetime access: no expiration
  is_active BOOLEAN DEFAULT TRUE,

  -- Indexes for fast lookups
  CONSTRAINT valid_wallet CHECK (wallet_address ~ '^0x[a-fA-F0-9]{40}$'),
  CONSTRAINT valid_tx_hash CHECK (tx_hash ~ '^0x[a-fA-F0-9]{64}$'),
  CONSTRAINT valid_tier CHECK (tier IN ('Pro', 'Enterprise'))
);

-- Create indexes
CREATE INDEX idx_wallet_address ON subscriptions(wallet_address);
CREATE INDEX idx_tx_hash ON subscriptions(tx_hash);
CREATE INDEX idx_is_active ON subscriptions(is_active);

-- Payment verification attempts (rate limiting & security)
CREATE TABLE payment_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address VARCHAR(42) NOT NULL,
  tx_hash VARCHAR(66) NOT NULL,
  ip_address VARCHAR(45),
  success BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_wallet_attempt CHECK (wallet_address ~ '^0x[a-fA-F0-9]{40}$')
);

-- Create index for rate limiting
CREATE INDEX idx_payment_attempts_wallet ON payment_attempts(wallet_address, attempted_at);
CREATE INDEX idx_payment_attempts_ip ON payment_attempts(ip_address, attempted_at);

-- Row Level Security Policies
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_attempts ENABLE ROW LEVEL SECURITY;

-- Allow read access to subscriptions (for checking Pro status)
CREATE POLICY "Allow public read access to subscriptions"
  ON subscriptions FOR SELECT
  USING (true);

-- Only allow inserts from service role (API routes)
CREATE POLICY "Allow service role to insert subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (true);

-- Only allow service role to manage payment attempts
CREATE POLICY "Allow service role to manage payment attempts"
  ON payment_attempts FOR ALL
  USING (true);

-- Admin view for monitoring
CREATE VIEW subscription_stats AS
SELECT
  COUNT(*) as total_subscriptions,
  COUNT(*) FILTER (WHERE is_active = true) as active_subscriptions,
  SUM(amount_usd) as total_revenue,
  COUNT(DISTINCT DATE(created_at)) as days_with_sales
FROM subscriptions;

GRANT SELECT ON subscription_stats TO anon;
```

## 3. Add Environment Variables

Add to your `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 4. Security Notes

- **Service Role Key**: NEVER expose this in the browser. Only use in API routes.
- **Anon Key**: Safe to expose, only has read access due to RLS policies.
- **Lifetime Access**: No expiration dates, payment = permanent Pro access
- **Rate Limiting**: Payment attempts tracked per wallet + IP
- **Replay Protection**: tx_hash is unique, prevents reusing same transaction

## 5. Admin Queries

Check subscription status:
```sql
SELECT * FROM subscriptions WHERE wallet_address = '0x...';
```

View recent payments:
```sql
SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT 10;
```

Check stats:
```sql
SELECT * FROM subscription_stats;
```

View failed attempts (security monitoring):
```sql
SELECT * FROM payment_attempts WHERE success = false ORDER BY attempted_at DESC LIMIT 20;
```
