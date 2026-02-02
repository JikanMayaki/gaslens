# GasLens - Code Patterns & Best Practices

This document catalogs proven patterns and anti-patterns specific to GasLens development.

---

## React Patterns

### Client Component with Dark Mode
```tsx
'use client';

import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      const isDark = saved ? saved === 'true' :
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newMode);
      localStorage.setItem('darkMode', String(newMode));
    }
  };

  return (
    <button onClick={toggle}>
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
```

### Safe LocalStorage Access
```tsx
// ✅ Good
if (typeof window !== 'undefined') {
  const value = localStorage.getItem('key');
}

// ❌ Bad
const value = localStorage.getItem('key'); // Crashes during SSR
```

---

## Component Composition

### Card Wrapper
```tsx
// Reusable card component
export function Card({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}

// Usage
<Card>
  <h2>Gas Status</h2>
  <p>12 Gwei</p>
</Card>
```

### Status Badge Component
```tsx
type BadgeVariant = 'success' | 'warning' | 'error';

export function StatusBadge({
  variant,
  children
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
}) {
  const styles = {
    success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${styles[variant]}`}>
      {children}
    </span>
  );
}
```

---

## Data Fetching

### SWR Pattern (Recommended)
```tsx
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useGasPrice() {
  const { data, error, isLoading } = useSWR('/api/gas-price', fetcher, {
    refreshInterval: 30000, // Refresh every 30s
    revalidateOnFocus: true,
  });

  return {
    gasPrice: data?.gasPrice,
    status: data?.status,
    isLoading,
    isError: error,
  };
}
```

### API Route Pattern
```tsx
// app/api/gas-price/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch from Etherscan or similar
    const response = await fetch(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`
    );
    const data = await response.json();

    return NextResponse.json({
      gasPrice: Number(data.result.SafeGasPrice),
      status: 'success',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gas price' },
      { status: 500 }
    );
  }
}
```

---

## Styling Patterns

### Responsive Grid
```tsx
// 3 columns on large screens, 1 on mobile
<div className="grid lg:grid-cols-3 gap-6">
  <Card>Column 1</Card>
  <Card>Column 2</Card>
  <Card>Column 3</Card>
</div>
```

### Hover Effects
```tsx
// Lift on hover with color change
<button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
  Click Me
</button>
```

### Gradient Text
```tsx
<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  GasLens
</h1>
```

---

## TypeScript Patterns

### Gas Status Type
```tsx
type GasStatus = 'low' | 'fair' | 'high';

interface GasData {
  price: number; // in Gwei
  status: GasStatus;
  timestamp: number;
}

function getGasStatus(gwei: number): GasStatus {
  if (gwei < 20) return 'low';
  if (gwei < 40) return 'fair';
  return 'high';
}
```

### Protocol Comparison Type
```tsx
interface Protocol {
  name: string;
  fee: number; // in USD
  gasEstimate: number; // in wei
  duration: number; // in seconds
  confidence: number; // 0-100
}

interface ComparisonResult {
  protocols: Protocol[];
  recommended: string; // protocol name
  savings: number; // compared to average
}
```

---

## Animation Patterns

### Loading Spinner
```tsx
export function Spinner() {
  return (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  );
}
```

### Fade In
```tsx
export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}

// globals.css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}
```

---

## Error Handling

### API Error Pattern
```tsx
export async function fetchWithRetry(
  url: string,
  maxRetries = 3
): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      if (i === maxRetries - 1) throw new Error('Max retries reached');
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Failed to fetch');
}
```

### Error Boundary (TODO)
```tsx
// Need to implement this
export class ErrorBoundary extends React.Component {
  // Catch errors and show fallback UI
}
```

---

## Form Patterns

### Search Form
```tsx
export function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/compare?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl"
      />
    </form>
  );
}
```

### Range Slider
```tsx
export function GasSlider() {
  const [value, setValue] = useState(12);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          Target Gas
        </span>
        <span className="text-sm font-bold">
          {value} Gwei
        </span>
      </div>
      <input
        type="range"
        min="5"
        max="50"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}
```

---

## Performance Patterns

### Dynamic Import
```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Spinner />,
  ssr: false, // Client-side only
});
```

### Memoization
```tsx
import { useMemo } from 'react';

function ProtocolList({ protocols }: { protocols: Protocol[] }) {
  const sorted = useMemo(
    () => protocols.sort((a, b) => a.fee - b.fee),
    [protocols]
  );

  return (
    <ul>
      {sorted.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
  );
}
```

---

## Testing Patterns (TODO)

### Component Test
```tsx
// Need to set up testing framework
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

test('renders success badge', () => {
  render(<StatusBadge variant="success">Confirmed</StatusBadge>);
  expect(screen.getByText('Confirmed')).toBeInTheDocument();
});
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Don't: Inline styles
```tsx
// Bad
<div style={{ backgroundColor: darkMode ? '#000' : '#fff' }}>
```

### ❌ Don't: Hardcode colors
```tsx
// Bad
<div className="bg-[#3B82F6]">

// Good
<div className="bg-blue-600">
```

### ❌ Don't: Mix state management
```tsx
// Bad: Using both useState and localStorage directly in render
function Component() {
  const [value, setValue] = useState(localStorage.getItem('key'));
  // This will crash during SSR
}
```

### ❌ Don't: Forget error handling
```tsx
// Bad
const data = await fetch('/api/gas').then(r => r.json());

// Good
try {
  const response = await fetch('/api/gas');
  if (!response.ok) throw new Error('Failed');
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
}
```

---

*Update this file whenever you discover a new pattern or anti-pattern*
