'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface SubscriptionStatus {
  hasPro: boolean;
  tier: 'Free' | 'Pro' | 'Enterprise';
  since?: string;
  accessType?: 'lifetime';
  loading: boolean;
  error?: string;
}

export function useSubscription(): SubscriptionStatus {
  const { address, isConnected } = useAccount();
  const [status, setStatus] = useState<SubscriptionStatus>({
    hasPro: false,
    tier: 'Free',
    loading: true,
  });

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isConnected || !address) {
        setStatus({ hasPro: false, tier: 'Free', loading: false });
        return;
      }

      setStatus(prev => ({ ...prev, loading: true }));

      try {
        const response = await fetch(`/api/subscription/status?wallet=${address}`);
        const data = await response.json();

        if (response.ok) {
          setStatus({
            hasPro: data.hasPro,
            tier: data.tier,
            since: data.since,
            accessType: data.accessType,
            loading: false,
          });
        } else {
          setStatus({
            hasPro: false,
            tier: 'Free',
            loading: false,
            error: data.error,
          });
        }
      } catch (error: any) {
        console.error('Failed to check subscription:', error);
        setStatus({
          hasPro: false,
          tier: 'Free',
          loading: false,
          error: error.message,
        });
      }
    };

    checkSubscription();
  }, [address, isConnected]);

  return status;
}
