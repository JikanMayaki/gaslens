'use client';

import dynamic from 'next/dynamic';
import Header from '../components/ui/layout/Header';
import Footer from '../components/ui/layout/Footer';

// Dynamically import RainbowKit to avoid SSR issues
const RainbowKit = dynamic(() => import('./RainbowKitProvider'), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RainbowKit>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </RainbowKit>
  );
}
