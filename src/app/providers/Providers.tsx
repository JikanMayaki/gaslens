'use client';

import RainbowKit from './RainbowKitProvider';
import Header from '../components/ui/layout/Header';
import Footer from '../components/ui/layout/Footer';

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
