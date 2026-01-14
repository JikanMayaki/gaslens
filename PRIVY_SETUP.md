# Privy Authentication Setup Guide

GasLens uses [Privy](https://privy.io) for user authentication to capture emails and names.

## Quick Setup

### 1. Create a Privy Account

1. Go to [dashboard.privy.io](https://dashboard.privy.io)
2. Sign up for a free account
3. Create a new app

### 2. Get Your App ID

1. In your Privy dashboard, find your **App ID**
2. Copy the App ID (looks like `clxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 3. Configure Environment Variables

Add your Privy App ID to `.env.local`:

```env
NEXT_PUBLIC_PRIVY_APP_ID=your_actual_app_id_here
```

### 4. Configure Login Methods

In the Privy dashboard:

1. Go to **Settings** → **Login Methods**
2. Enable the methods you want:
   - ✅ Email (recommended)
   - ✅ Google
   - ✅ Twitter/X
   - Or any other methods

### 5. Set Redirect URLs

In Privy dashboard → **Settings** → **URLs**:

**Development:**
- `http://localhost:3000`

**Production:**
- `https://your-domain.com`
- `https://gaslens-*.vercel.app` (for Vercel previews)

## Features

Once configured, users can:
- Sign in with Email, Google, or Twitter
- Their email and name are automatically captured
- User info is displayed in the header
- Sign out functionality

## Testing Locally

1. Add your Privy App ID to `.env.local`
2. Run `npm run dev`
3. Click "Sign In" in the header
4. Choose a login method
5. Complete authentication
6. See your email/name displayed

## What Gets Captured

When a user signs in, Privy captures:
- **Email address** (if using email or social login)
- **Name** (from social logins like Google)
- **User ID** (unique identifier)

Access user data in your app:

\`\`\`typescript
import { usePrivy } from '@privy-io/react-auth';

function MyComponent() {
  const { user } = usePrivy();

  console.log(user?.email?.address); // user@example.com
  console.log(user?.google?.name); // John Doe
}
\`\`\`

## Privy Free Tier

Privy's free tier includes:
- ✅ Up to 1,000 monthly active users
- ✅ Email login
- ✅ Social logins (Google, Twitter, etc.)
- ✅ User management dashboard

Perfect for getting started!

## Deployment to Vercel

Add the environment variable to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Key:** `NEXT_PUBLIC_PRIVY_APP_ID`
   - **Value:** Your Privy App ID
4. Redeploy

## Security Notes

- ✅ App ID is safe to expose (it's prefixed with `NEXT_PUBLIC_`)
- ✅ Privy handles all authentication security
- ✅ No backend code needed
- ✅ GDPR compliant

## Support

- **Privy Docs:** https://docs.privy.io
- **Dashboard:** https://dashboard.privy.io
- **Community:** https://discord.gg/privy

---

Built with ❤️ for GasLens
