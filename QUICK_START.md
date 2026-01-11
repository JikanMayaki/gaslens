# GasLens - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment (Optional)
```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local and add your API keys (optional - works without them!)
# Get a free Etherscan API key: https://etherscan.io/apis
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you're done! 🎉

---

## 📱 What You Can Do Now

### Without Any API Keys:
- ✅ Browse the homepage
- ✅ View all protocols in the directory
- ✅ Compare fees with simulated data
- ✅ Test all UI components
- ✅ Try dark mode
- ✅ Explore all pages

### With Just an Etherscan API Key:
- ✅ **Everything above, plus:**
- ✅ Real-time gas prices from the Ethereum network
- ✅ Accurate fee calculations
- ✅ Live network status
- ✅ Transaction time estimates

---

## 🔑 Getting API Keys (All Optional)

### Etherscan (Recommended - Free)
1. Go to https://etherscan.io/apis
2. Sign up for a free account
3. Create an API key
4. Add to `.env.local`: `NEXT_PUBLIC_ETHERSCAN_API_KEY=your_key`

### Others (Optional)
- **1inch**: https://portal.1inch.dev/
- **0x Protocol**: https://dashboard.0x.org/
- **CoinGecko**: https://www.coingecko.com/en/api

---

## 🧪 Test Everything Works

1. **Homepage** - Visit `/`
   - Should see hero section and feature cards

2. **Compare Fees** - Visit `/compare`
   - Select tokens (e.g., ETH → USDC)
   - Enter amount (e.g., 1)
   - Click "Compare Protocols"
   - Should see fee comparison for Uniswap, SushiSwap, Curve

3. **Protocol Directory** - Visit `/directory`
   - Should see all 3 protocols with details

4. **Dark Mode** - Toggle dark mode in your browser
   - Everything should adapt to dark theme

---

## 🎨 Available Pages

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Landing page with features |
| Compare | `/compare` | Fee comparison tool |
| Directory | `/directory` | Browse all protocols |
| About | `/about` | Mission and values |
| Pricing | `/pricing` | Pricing tiers (currently free) |

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### API not working
- Check `.env.local` file exists and has correct keys
- Verify API keys are valid (test on provider's website)
- Check browser console for specific error messages

### Styles not loading
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## 📦 What's Included

- ✅ Next.js 16 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS v4 for styling
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Real-time data fetching
- ✅ Custom React hooks
- ✅ API routes
- ✅ Chart components (Recharts)
- ✅ Icon library (Lucide)
- ✅ Form validation (Zod)

---

## 🚢 Deploy to Production

### Vercel (Recommended - Free)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy! 🎉

### Other Platforms
Works on:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting

---

## 💡 Pro Tips

1. **Start without API keys** - The app works great with mock data for testing
2. **Add Etherscan key first** - It's free and gives you real gas prices
3. **Test dark mode** - All components support it automatically
4. **Check the console** - Helpful error messages for debugging
5. **Read IMPLEMENTATION.md** - For detailed architecture info

---

## 📚 Learn More

- [Full Documentation](./README.md)
- [Implementation Details](./IMPLEMENTATION.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

## 🤝 Need Help?

1. Check `README.md` for detailed setup
2. Check `IMPLEMENTATION.md` for architecture
3. Review `.env.example` for required variables
4. Open an issue on GitHub

---

**That's it! You're ready to use GasLens. Happy saving! 💸**
