'use client';

import { ReactNode } from 'react';
import { useSubscription } from '../lib/hooks/useSubscription';
import { Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';

interface ProGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  feature?: string;
}

/**
 * ProGate component - Gates Pro features behind subscription check
 *
 * Usage:
 * <ProGate feature="Advanced Alerts">
 *   <AlertsFeature />
 * </ProGate>
 */
export function ProGate({ children, fallback, feature = 'this feature' }: ProGateProps) {
  const { hasPro, loading, tier } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-zinc-600 dark:text-zinc-400">
          Checking subscription...
        </span>
      </div>
    );
  }

  if (!hasPro) {
    return fallback || (
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center">
        <Lock className="w-12 h-12 mx-auto mb-4 text-zinc-400" />
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          {tier === 'Free' ? 'Pro Feature' : 'Upgrade Required'}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Upgrade to GasLens Pro to access {feature}.
        </p>
        <Link href="/pricing">
          <Button variant="primary" size="md">
            View Pricing
          </Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * ProBadge component - Shows Pro status indicator
 */
export function ProBadge() {
  const { hasPro, tier } = useSubscription();

  if (!hasPro) return null;

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      {tier}
    </span>
  );
}
