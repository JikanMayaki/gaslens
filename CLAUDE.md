# GasLens - Claude Code Guidelines

This document contains project-specific conventions, patterns, and lessons learned for GasLens development. Update this file after every significant correction or learning.

## Project Overview

**GasLens** is a professional DeFi gas fee comparison application that helps users find the cheapest protocols for their transactions. The app follows Web2 design principles (like Stripe, Linear, Airbnb) to reduce cognitive load and create a calm, trustworthy experience.

**Core Philosophy**: Show value first, hide complexity, make it feel effortless.

---

## Design System

### Color Palette
- **Light mode background**: `#F9FAFB` (soft off-white, NOT pure white)
- **Dark mode background**: `#121212` (soft black, NOT pitch black `#000000`)
- **Action color**: `#3B82F6` (reliable blue for trust and financial stability)
- **Text hierarchy**:
  - Primary: `zinc-900` (light) / `zinc-50` (dark)
  - Secondary: `zinc-600` (light) / `zinc-400` (dark)
  - Tertiary: `zinc-500` (light) / `zinc-500` (dark)

### Border Radius
- **Standard**: `12px` to `16px`
- **Large cards**: `xl` (12px) or `2xl` (16px)
- **Pills/badges**: `full`
- **Avoid**: Sharp corners (0px) - they feel clinical and aggressive

### Spacing
- Use Tailwind's spacing scale consistently
- Generous white space between sections
- Card padding: `p-6` or `p-8` for large cards

### Typography
- **Font family**: Geist Sans (already configured)
- **Sizes**: Keep 3px smaller than typical Web3 apps
  - Headers: `text-xl` to `text-4xl` (avoid oversized text)
  - Body: `text-sm` to `text-base`
  - Small text: `text-xs`
- **Avoid**: Monospace fonts for UI (only use for code/addresses)

---

## Dark Mode Requirements

### Critical Rules
1. **ALWAYS test both light and dark mode** before committing
2. **Use Tailwind's dark: variants** for all color classes
3. **Never use pure black** (`#000000`) in dark mode - use `#121212` or `zinc-950`
4. **Status badges must have dark variants**:
   ```tsx
   // Good
   className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"

   // Bad
   className="bg-emerald-100 text-emerald-700"
   ```

### Dark Mode Checklist
- [ ] All backgrounds have dark variants
- [ ] All text colors are readable in both modes
- [ ] All borders visible in both modes
- [ ] All shadows work in both modes (use `dark:shadow-zinc-900/50` for dark mode)
- [ ] All status colors have proper dark variants
- [ ] Icons use appropriate opacity (`text-zinc-600 dark:text-zinc-400`)

### LocalStorage Pattern
Always check for `typeof window !== 'undefined'` before accessing localStorage:
```tsx
useEffect(() => {
  if (typeof window !== 'undefined') {
    const savedMode = localStorage.getItem('darkMode');
    // ... rest of logic
  }
}, []);
```

---

## Component Patterns

### Cards
Standard card pattern for GasLens:
```tsx
<div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
  {/* Card content */}
</div>
```

### Buttons
Primary action button:
```tsx
<button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
  Action
</button>
```

### Input Fields
Standard input with proper dark mode:
```tsx
<input
  className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
```

### Status Badges
```tsx
// Success/Confirmed
<span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs rounded-full">
  Confirmed
</span>

// Warning/Pending
<span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full">
  Pending
</span>

// Error/Failed
<span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full">
  Failed
</span>
```

---

## Gas Display Patterns

### Gas Status
Display gas as human-readable status, NOT raw Gwei:
```tsx
// Good: "Gas is Low" with context
<h1 className="text-4xl font-bold">
  Ethereum gas is currently <span className="text-emerald-600">Low</span>.
</h1>

// Bad: Just showing "28 Gwei" without context
<div>28 Gwei</div>
```

### Gas Thresholds
```tsx
const gasStatus = currentGasPrice < 20 ? 'Low'
  : currentGasPrice < 40 ? 'Fair'
  : 'High';
```

### Recommendations
Always provide actionable advice:
- **Low**: "Great time to transact!"
- **Fair**: "Moderate fees expected"
- **High**: "Consider waiting or using L2"

---

## Common Mistakes & Fixes

### ❌ Mistake 1: Using localStorage during SSR
**Problem**: `localStorage.getItem is not a function` during build

**Solution**: Always check for browser environment:
```tsx
if (typeof window !== 'undefined') {
  localStorage.getItem('key');
}
```

### ❌ Mistake 2: Forgetting dark mode variants
**Problem**: Elements invisible or unreadable in dark mode

**Solution**: Use this checklist for every new component:
- Background: `bg-white dark:bg-zinc-950`
- Border: `border-gray-200 dark:border-zinc-800`
- Text: `text-zinc-900 dark:text-zinc-50`

### ❌ Mistake 3: RainbowKit SSR issues
**Problem**: Build fails with RainbowKit localStorage errors

**Solution**: Use dynamic import with `ssr: false`:
```tsx
const RainbowKit = dynamic(() => import('./RainbowKitProvider'), {
  ssr: false,
});
```

### ❌ Mistake 4: Duplicate footers
**Problem**: Footer appears twice (once in layout, once in page)

**Solution**: Only include footer in `Providers.tsx`, never in individual pages

### ❌ Mistake 5: Oversized text
**Problem**: Text too large, overwhelming users

**Solution**: Reduce font sizes by 3px from typical Web3 apps:
- Logo: `text-xl` (not `text-2xl`)
- Headers: `text-3xl` to `text-4xl` (not `text-5xl` to `text-7xl`)
- Body: `text-sm` to `text-base`

---

## Web2 vs Web3 Design Principles

| Feature | ❌ Web3 Way (Avoid) | ✅ Web2 Way (Adopt) |
|---------|-------------------|-------------------|
| **Colors** | Neon greens/purples on black | Soft neutrals, single action color |
| **Data** | Raw Gwei numbers, complex charts | Human-readable status ("Gas is Low") |
| **Onboarding** | "Connect Wallet" first | Show value first, wallet later |
| **Typography** | Monospace, "Gamer" fonts | Clean sans-serif (Geist, Inter) |
| **Complexity** | Everything visible always | Progressive disclosure |

---

## File Organization

### Routes Structure
```
/app
  /page.tsx           - Dashboard with gas status
  /compare/page.tsx   - Protocol comparison tool
  /directory/page.tsx - Protocol directory
  /status/page.tsx    - System status
  /docs/page.tsx      - Documentation
  /pricing/page.tsx   - Pricing page
  /privacy/page.tsx   - Privacy policy
  /terms/page.tsx     - Terms of service
```

### Component Structure
```
/components
  /ui
    /layout
      /Header.tsx     - Global header (RainbowKit connect)
      /Footer.tsx     - Global footer
    /cards           - Reusable card components
    /forms           - Form elements
```

---

## API Integration

### Gas Price API
Use Etherscan API or similar:
```tsx
const response = await fetch('/api/gas-price');
const { gasPrice, status } = await response.json();
```

### Protocol Fees API
Mock endpoint structure:
```tsx
GET /api/protocol-fees?tokenIn=ETH&tokenOut=USDT&amount=1
Response: {
  protocols: [
    { name: 'Uniswap', fee: 2.50, gasEstimate: 150000 },
    { name: '1inch', fee: 2.30, gasEstimate: 180000 }
  ]
}
```

---

## Testing & Validation

### Before Every Commit
1. ✅ Build succeeds: `npm run build`
2. ✅ Dark mode works: Toggle in dev mode
3. ✅ Responsive design: Test mobile, tablet, desktop
4. ✅ No console errors
5. ✅ Links work
6. ✅ Forms validate properly

### Performance
- Keep bundle size under control
- Lazy load heavy components
- Use dynamic imports for client-only code

---

## Git Workflow

### Branch Naming
- `feature/gas-alerts` - New features
- `fix/dark-mode-toggle` - Bug fixes
- `refactor/card-components` - Code improvements
- `docs/update-readme` - Documentation

### Commit Messages
Follow this format:
```
Short summary (50 chars)

- Detailed change 1
- Detailed change 2
- Why this change was made

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Deployment
- Main branch auto-deploys to Vercel
- Test in dev before pushing to main
- Use `git status` before committing

---

## Security Considerations

### Environment Variables
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=xxx
ETHERSCAN_API_KEY=xxx
```

### Content Security Policy
Already configured in `next.config.ts`:
- Allow WalletConnect domains
- Allow CDN for fonts/scripts
- Restrict frames and objects

### User Data
- Never log wallet addresses
- Don't store private keys (obviously)
- Use HTTPS only
- Rate limit API endpoints

---

## Performance Optimization

### Image Optimization
Use Next.js Image component:
```tsx
import Image from 'next/image';
<Image src="/icon.png" width={32} height={32} alt="Icon" />
```

### Code Splitting
```tsx
// Heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Spinner />,
  ssr: false
});
```

### Caching
- Cache gas prices for 30 seconds
- Cache protocol list for 5 minutes
- Use SWR or React Query for data fetching

---

## Accessibility

### Required Attributes
- All buttons have `aria-label` if icon-only
- Form inputs have proper labels
- Focus states visible
- Keyboard navigation works

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Test with tools like Lighthouse

---

## Continuous Improvement

### After Every Major Change
1. Update CLAUDE.md with lessons learned
2. Document new patterns
3. Note mistakes to avoid
4. Update skills if tasks repeated

### Regular Reviews
- Weekly: Review and clean up CLAUDE.md
- Monthly: Audit for outdated patterns
- Quarterly: Major refactoring if needed

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [RainbowKit](https://www.rainbowkit.com/docs)
- [Etherscan API](https://docs.etherscan.io/)
- [Web Design Principles](https://stripe.com/design)

---

*Last Updated: 2026-02-02*
*Update this file whenever you learn something new or make a mistake!*
