import { Zap, Users, Target, Heart } from 'lucide-react';
import { Card } from '../components/ui/Card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          About GasLens
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12">
          We're on a mission to make DeFi more accessible by helping users save on gas fees
        </p>

        {/* Mission */}
        <Card padding="lg" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">
                Our Mission
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Gas fees are one of the biggest barriers to entry in DeFi. A simple swap that should cost a few dollars can sometimes cost $50 or more depending on which protocol you use and when you execute the transaction.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                GasLens was built to solve this problem. We aggregate fee data across all major DeFi protocols in real-time, so you can always find the cheapest path for your transactions.
              </p>
            </div>
          </div>
        </Card>

        {/* What We Do */}
        <Card padding="lg" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">
                What We Do
              </h2>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span><strong>Real-time Fee Comparison:</strong> Compare gas costs across Uniswap, SushiSwap, Curve, and more</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span><strong>Live Gas Prices:</strong> Track Ethereum network gas prices updated every block</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span><strong>Smart Routing:</strong> Find the optimal path for your swaps to minimize total costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span><strong>Transparency:</strong> See detailed breakdowns of gas fees and protocol fees</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Team */}
        <Card padding="lg" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">
                Built by DeFi Users, for DeFi Users
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We're a team of developers and DeFi enthusiasts who got tired of overpaying for gas. After spending thousands on unnecessary fees, we decided to build a tool that would help everyone in the community save money.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                GasLens is open source and community-driven. We believe that transparent, accessible tools are essential for the future of decentralized finance.
              </p>
            </div>
          </div>
        </Card>

        {/* Values */}
        <Card padding="lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    Transparency
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    No hidden fees, no affiliate kickbacks. We show you exactly what you'll pay.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    Accuracy
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Real-time data from on-chain sources and trusted APIs.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    Community
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Open source and built with feedback from real users.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    Security
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    We only show data from audited, reputable protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
