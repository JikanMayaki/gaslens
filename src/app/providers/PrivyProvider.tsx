'use client';

import { PrivyProvider as Privy } from '@privy-io/react-auth';

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('Privy App ID:', appId);
  }

  // Fallback to children without Privy if no app ID is configured
  // This allows the app to build and run without Privy configuration
  if (!appId || appId === 'your_privy_app_id_here' || appId.trim() === '') {
    if (typeof window !== 'undefined') {
      console.warn('Privy App ID not configured. Sign in will not work. Get your App ID from: https://dashboard.privy.io');
    }
    return <>{children}</>;
  }

  // Extra safety: validate the App ID format
  if (!appId.startsWith('cm') || appId.length < 20) {
    console.error('Invalid Privy App ID format:', appId);
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
        },
      }}
    >
      {children}
    </Privy>
  );
}
