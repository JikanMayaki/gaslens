'use client';

import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Link from 'next/link';
import { useAccount, useConnect } from 'wagmi';
import { useCryptoPayment } from '../lib/hooks/useCryptoPayment';

export default function PricingPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [ethPrice, setEthPrice] = useState(2000); // Default, will be updated

  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  // Fetch current ETH price
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('/api/token-prices?symbols=ethereum');
        const data = await response.json();
        if (data.prices?.ethereum?.usd) {
          setEthPrice(data.prices.ethereum.usd);
        }
      } catch (error) {
        console.error('Failed to fetch ETH price:', error);
      }
    };
    fetchEthPrice();
  }, []);

  const {
    currency,
    setCurrency,
    payWithEth,
    payWithUsdc,
    loading: cryptoLoading,
    txHash,
    isSuccess: cryptoSuccess,
  } = useCryptoPayment({
    amount: 9,
    planName: 'Pro',
    onSuccess: async (hash) => {
      // Verify payment on backend
      try {
        await fetch('/api/crypto/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            txHash: hash,
            walletAddress: address,
            planName: 'Pro',
            amount: 9,
            currency,
          }),
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 10000);
      } catch (error) {
        console.error('Payment verification failed:', error);
      }
    },
    onError: (error) => {
      console.error('Crypto payment error:', error);
      alert(`Payment failed: ${error.message}`);
    },
  });

  const handleCryptoPayment = async () => {
    if (!isConnected) {
      // Connect wallet first
      const injectedConnector = connectors.find(c => c.id === 'injected');
      if (injectedConnector) {
        connect({ connector: injectedConnector });
      }
      return;
    }

    try {
      if (currency === 'ETH') {
        await payWithEth(ethPrice);
      } else {
        await payWithUsdc();
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-4 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <p className="text-emerald-800 dark:text-emerald-200 font-semibold text-center">
              🎉 Payment successful! Welcome to GasLens Pro!
            </p>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Free */}
          <Card padding="lg" hover>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                Free
              </h3>
              <div className="text-4xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                $0
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">Forever free</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Real-time gas price tracking
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Compare fees across major DEXes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Protocol directory
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Unlimited comparisons
                </span>
              </li>
            </ul>

            <Link href="/compare">
              <Button variant="outline" size="md" className="w-full">
                Get Started
              </Button>
            </Link>
          </Card>

          {/* Pro */}
          <Card padding="lg" className="border-2 border-blue-600 dark:border-blue-400 relative" hover>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 dark:bg-blue-500 text-white">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                Pro
              </h3>
              <div className="text-4xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                $9
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">per month</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Everything in Free
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Fee alerts and notifications
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Historical fee data & analytics
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Advanced charts and insights
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Priority support
                </span>
              </li>
            </ul>

            {/* Currency Selection */}
            <div className="mb-4">
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Pay with crypto:
              </p>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setCurrency('USDC')}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    currency === 'USDC'
                      ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  USDC
                  <div className="text-xs opacity-70">$9.00</div>
                </button>
                <button
                  onClick={() => setCurrency('ETH')}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    currency === 'ETH'
                      ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  ETH
                  <div className="text-xs opacity-70">≈{(9 / ethPrice).toFixed(5)} ETH</div>
                </button>
              </div>
              {cryptoSuccess && txHash && (
                <div className="mb-3 p-3 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium mb-1">
                    Payment Successful!
                  </p>
                  <a
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline break-all"
                  >
                    View transaction →
                  </a>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleCryptoPayment}
              disabled={cryptoLoading}
            >
              {cryptoLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : isConnected ? (
                `Pay ${currency === 'USDC' ? '$9 USDC' : `${(9 / ethPrice).toFixed(5)} ETH`}`
              ) : (
                'Connect Wallet to Pay'
              )}
            </Button>
          </Card>

          {/* Enterprise */}
          <Card padding="lg" hover>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                Enterprise
              </h3>
              <div className="text-4xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                Custom
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">Contact us</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Everything in Pro
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  API access
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Custom integrations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Dedicated support
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  SLA guarantees
                </span>
              </li>
            </ul>

            <a href="mailto:sales@gaslens.com">
              <Button variant="outline" size="md" className="w-full">
                Contact Sales
              </Button>
            </a>
          </Card>
        </div>

        {/* FAQ */}
        <Card padding="lg">
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Yes! You can cancel your Pro subscription at any time. You'll have access to Pro features until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                We accept crypto payments (ETH and USDC) on Ethereum mainnet and major L2s (Optimism, Polygon, Base, Arbitrum). Fully decentralized and permissionless.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Do you take affiliate fees from protocols?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                No. We don't receive any compensation from the protocols we track. Our recommendations are based purely on what will save you the most money.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                What happens to my alerts if I downgrade?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Your alerts will be preserved but you won't receive notifications. If you upgrade again, they'll be reactivated automatically.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
