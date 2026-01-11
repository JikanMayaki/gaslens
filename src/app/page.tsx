import Link from "next/link";
import { Zap, TrendingDown, Shield, Clock } from "lucide-react";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200 text-sm font-medium">
            <Zap className="w-4 h-4" />
            See Through the Fees
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
            Compare Gas Fees Across DeFi Protocols
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Stop overpaying for DeFi transactions. GasLens helps you find the cheapest path across Uniswap, SushiSwap, Curve, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compare">
              <Button variant="primary" size="lg">
                Compare Fees Now
              </Button>
            </Link>
            <Link href="/directory">
              <Button variant="outline" size="lg">
                Browse Protocols
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card padding="lg" hover>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
                Save on Fees
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Compare fees across protocols and save up to 50% on transaction costs
              </p>
            </div>
          </Card>

          <Card padding="lg" hover>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
                Real-time Data
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Live gas prices and protocol fees updated every block
              </p>
            </div>
          </Card>

          <Card padding="lg" hover>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
                Audited Protocols
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Only compare fees on security-audited and trusted protocols
              </p>
            </div>
          </Card>

          <Card padding="lg" hover>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
                Time Estimates
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                See estimated confirmation times based on current gas prices
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card padding="lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Ready to start saving on gas fees?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Join thousands of DeFi users who are optimizing their transaction costs with GasLens
            </p>
            <Link href="/compare">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
