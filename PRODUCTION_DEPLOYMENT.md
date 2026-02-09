# GasLens Production Deployment Guide

## 🔒 Security Checklist (Complete BEFORE Deployment)

### 1. **Supabase Setup** (15 minutes)

1. Go to https://supabase.com and create a free project
2. Copy your Project URL and API keys
3. Go to **SQL Editor** and run the SQL from `SUPABASE_SETUP.md`
4. Verify tables created: `subscriptions`, `payment_attempts`, `subscription_stats`

### 2. **Treasury Wallet** (CRITICAL)

**Option A: Gnosis Safe (Recommended for Production)**
1. Go to https://app.safe.global
2. Create a new Safe on Ethereum mainnet
3. Add 2-3 signers (requires 2/3 signatures for withdrawals)
4. Copy the Safe address

**Option B: EOA Wallet (Only for Testing)**
- Use MetaMask/hardware wallet
- **NEVER use the same wallet for personal funds**
- Transfer to cold storage immediately after receiving payments

**⚠️ WARNING**: Using `0x0000...0000` will **permanently burn all payments**

### 3. **Admin Secret** (Security)

Generate a strong secret:
```bash
openssl rand -base64 32
```

Save this securely - you'll need it to view subscriptions.

### 4. **Vercel Environment Variables**

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these (copy from `.env.local` after filling them in):

```bash
# APIs
ETHERSCAN_API_KEY=
ZEROX_API_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Wallet
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_TREASURY_WALLET_ADDRESS=

# Admin
ADMIN_SECRET_KEY=

# App
NEXT_PUBLIC_APP_URL=https://gaslens.vercel.app
```

---

## 🚀 Deployment Steps

### Step 1: Local Testing

```bash
# Update .env.local with real values
npm run build
npm run dev
```

Test:
1. Visit http://localhost:3000/pricing
2. Connect wallet
3. **DO NOT** make real payment yet
4. Check subscription status at http://localhost:3000/alerts

### Step 2: Testnet Testing (Optional but Recommended)

1. Deploy to Vercel staging environment
2. Update `verify-transaction.ts` to accept Sepolia (chain ID 11155111)
3. Get testnet ETH from https://sepoliafaucet.com
4. Make test payment
5. Verify on-chain verification works
6. **IMPORTANT**: Revert back to mainnet-only before production

### Step 3: Production Deployment

```bash
git add -A
git commit -m "Add production-ready payment system"
git push origin main
```

Vercel will auto-deploy.

### Step 4: Smoke Tests

After deployment:

1. **Subscription Check**:
   ```bash
   curl https://gaslens.vercel.app/api/subscription/status?wallet=0xYourWallet
   ```
   Expected: `{"hasPro":false,"tier":"Free"}`

2. **Admin Access**:
   ```bash
   curl -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
        https://gaslens.vercel.app/api/admin/subscriptions
   ```
   Expected: `{"subscriptions":[],"stats":{...}}`

3. **Treasury Wallet**: Verify it's NOT `0x0000...0000`

4. **Make Small Test Payment**: Pay $9 USDC or 0.005 ETH
5. **Verify Payment**: Check admin API, verify Pro access

---

## 🛡️ Security Hardening

### Penetration Testing Checklist

- [x] **Replay Attack**: Transaction hash uniqueness enforced (database constraint)
- [x] **Rate Limiting**: Max 3 attempts per wallet per 5 minutes
- [x] **On-Chain Verification**: All payments verified via Etherscan API
- [x] **Chain Verification**: Only Ethereum mainnet accepted (chain ID 1)
- [x] **Amount Verification**: Server-side price check (±5% tolerance)
- [x] **Confirmation Requirements**: Minimum 3 block confirmations
- [x] **Sender Verification**: Transaction sender must match wallet address
- [x] **Double Payment**: Wallet can only have 1 active subscription
- [x] **Admin Protection**: Admin API requires secret key bearer token
- [x] **Database Security**: Row Level Security (RLS) enabled on Supabase

### Additional Security Measures

1. **Enable Vercel Authentication** (optional):
   - Add IP allowlist for admin endpoints
   - Use Vercel Edge Config for admin secrets

2. **Monitor for Attacks**:
   ```sql
   -- Check failed payment attempts
   SELECT * FROM payment_attempts WHERE success = false ORDER BY attempted_at DESC LIMIT 100;
   ```

3. **Set up Alerts** (Supabase):
   - Alert on >10 failed attempts from same IP
   - Alert on new subscriptions (for monitoring)

4. **Backup Strategy**:
   - Supabase auto-backups (free tier: 7 days)
   - Export subscriptions weekly to CSV

---

## 📊 Monitoring & Analytics

### Admin Dashboard

View all subscriptions:
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
     "https://gaslens.vercel.app/api/admin/subscriptions?limit=50&offset=0"
```

### Key Metrics to Track

1. **Conversion Rate**: Visits to /pricing → Payments
2. **Failed Payments**: Check `payment_attempts` table
3. **Revenue**: `SUM(amount_usd)` from subscriptions
4. **Active Users**: Connect wallet → Check Pro features

### Supabase Queries

```sql
-- Total revenue
SELECT SUM(amount_usd) as revenue FROM subscriptions;

-- Subscriptions by day
SELECT DATE(created_at) as day, COUNT(*) as count
FROM subscriptions
GROUP BY DATE(created_at)
ORDER BY day DESC;

-- Failed payment attempts (potential fraud)
SELECT wallet_address, COUNT(*) as attempts
FROM payment_attempts
WHERE success = false
GROUP BY wallet_address
HAVING COUNT(*) > 5
ORDER BY attempts DESC;
```

---

## 🔧 Maintenance

### Monthly Tasks

1. **Check Treasury Balance**:
   - Go to Etherscan: `https://etherscan.io/address/YOUR_TREASURY`
   - Verify balance matches revenue
   - Transfer to cold storage if needed

2. **Review Failed Attempts**:
   - Check for patterns (same wallet, IP, error messages)
   - Update verification logic if needed

3. **Database Cleanup** (optional):
   ```sql
   -- Archive old payment attempts (>30 days)
   DELETE FROM payment_attempts WHERE attempted_at < NOW() - INTERVAL '30 days';
   ```

### Updating Payment Amounts

1. Update pricing in `pricing/page.tsx`:
   ```typescript
   amount: 9 // Change to new price
   ```

2. Update display prices (3 locations):
   - Pro card: `$9`
   - USDC button: `$9.00`
   - ETH button: calculation uses `amount`

### Handling Disputes/Refunds

1. Verify payment on Etherscan
2. If legitimate refund request:
   ```bash
   curl -X PATCH \
        -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
        -H "Content-Type: application/json" \
        -d '{"walletAddress":"0x...","isActive":false}' \
        https://gaslens.vercel.app/api/admin/subscriptions
   ```
3. Manually send refund from treasury wallet

---

## 🆘 Emergency Procedures

### If Treasury Wallet Compromised

1. **Immediately** create new Safe wallet
2. Update `NEXT_PUBLIC_TREASURY_WALLET_ADDRESS` in Vercel
3. Redeploy
4. Notify users to resend payments

### If Supabase Compromised

1. Rotate service role key in Supabase dashboard
2. Update `SUPABASE_SERVICE_ROLE_KEY` in Vercel
3. Review `payment_attempts` for unauthorized access
4. Check `subscriptions` for fraudulent entries

### If Payment Verification Bypassed

1. Disable pricing page temporarily:
   ```typescript
   // pricing/page.tsx - add at top
   return <div>Payments temporarily disabled</div>;
   ```
2. Review recent subscriptions in database
3. Fix vulnerability
4. Audit all payments manually via Etherscan

---

## 📝 Support

### User Asks: "I paid but don't have Pro access"

1. Ask for transaction hash
2. Check Etherscan: https://etherscan.io/tx/TXHASH
3. Check `payment_attempts`:
   ```sql
   SELECT * FROM payment_attempts WHERE tx_hash = '0x...';
   ```
4. Common issues:
   - Insufficient confirmations (wait 3 blocks)
   - Paid to wrong address (refund manually)
   - Paid in wrong token (not ETH/USDC)
   - Paid on wrong network (e.g., Polygon)

### User Asks: "Can I cancel my subscription?"

**No cancellations** - lifetime access model. Payment = permanent Pro.

If user insists:
1. Offer to deactivate their subscription
2. No refunds (non-reversible crypto transactions)

---

## 📈 Scaling Considerations

### When You Reach 100 Subscriptions

1. **Consider upgrading Supabase** to Pro ($25/mo) for:
   - Better performance
   - 7-day point-in-time recovery
   - Daily backups

2. **Add Caching**:
   - Cache subscription status client-side (localStorage)
   - Add Redis for rate limiting

3. **Monitoring**:
   - Set up Sentry for error tracking
   - Add Vercel Analytics

### When You Reach 1000 Subscriptions

1. **Move to Dedicated Database** (optional)
   - Neon, PlanetScale, or RDS
   - Better performance, more control

2. **Add Queue System**:
   - Use Vercel Queue or AWS SQS
   - Process payments asynchronously

3. **Hire Security Audit**:
   - Professional penetration testing
   - Code review by security experts

---

## ✅ Final Checklist

Before going live:

- [ ] Supabase database created and tables verified
- [ ] Treasury wallet is Gnosis Safe (or secure EOA)
- [ ] All Vercel environment variables set
- [ ] Test payment on testnet succeeded
- [ ] Admin API access works
- [ ] Smoke tests pass
- [ ] Treasury address is NOT 0x0000...0000
- [ ] `.env.local` is in `.gitignore` (never commit secrets!)
- [ ] Team has access to treasury Safe
- [ ] Backup plan for treasury key loss

**Remember**: Crypto transactions are irreversible. Double-check everything before launch! 🚀
