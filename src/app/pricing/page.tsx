import { Check } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            GasLens is completely free to use. No subscription, no hidden fees.
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

          {/* Pro (Coming Soon) */}
          <Card padding="lg" className="border-2 border-blue-600 dark:border-blue-400 relative" hover>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 dark:bg-blue-500 text-white">
                Coming Soon
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

            <Button variant="primary" size="md" className="w-full" disabled>
              Notify Me
            </Button>
          </Card>

          {/* Enterprise (Coming Soon) */}
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

            <Button variant="outline" size="md" className="w-full">
              Contact Sales
            </Button>
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
                Is GasLens really free?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Yes! GasLens is completely free to use with no hidden fees or subscription required. Our mission is to make DeFi more accessible for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                How do you make money?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Currently, we don't. GasLens is a passion project built by DeFi users. In the future, we may offer premium features for power users, but the core functionality will always be free.
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
                When will Pro features be available?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                We're working on Pro features now! Sign up for our newsletter to be notified when they launch.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
