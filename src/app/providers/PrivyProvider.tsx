'use client';

import { PrivyProvider as Privy } from '@privy-io/react-auth';

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Fallback to children without Privy if no app ID is configured
  // This allows the app to build and run without Privy configuration
  if (!appId || appId === 'your_privy_app_id_here') {
    if (typeof window !== 'undefined') {
      console.warn('Privy App ID not configured. Sign in will not work. Get your App ID from: https://dashboard.privy.io');
    }
    return <>{children}</>;
  }

  return (
    <Privy
      appId={appId}
      config={{
        loginMethods: ['email', 'google', 'twitter'],
        appearance: {
          theme: 'light',
          accentColor: '#3B82F6',
          logo: 'https://gaslens.com/logo.png',
        },
      }}
    >
      {children}
    </Privy>
  );
}
