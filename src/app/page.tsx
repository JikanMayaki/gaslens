'use client';

import Link from "next/link";
import { Zap, TrendingDown, Shield, Clock, ArrowRight, Sparkles, Users, DollarSign } from "lucide-react";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { useState, useEffect } from "react";

export default function Home() {
  const [savedAmount, setSavedAmount] = useState(0);
  const targetAmount = 2847293; // Total saved for users

  // Animated counter effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetAmount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetAmount) {
        setSavedAmount(targetAmount);
        clearInterval(timer);
      } else {
        setSavedAmount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-zinc-950 dark:via-blue-950/10 dark:to-zinc-950 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-blue-500/10 blur-3xl animate-pulse"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200/50 dark:border-blue-500/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              See Through the Fees, Choose the Cheapest Path
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            Stop Overpaying for
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              DeFi Swaps
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Compare gas fees across <span className="font-bold text-zinc-900 dark:text-zinc-50">7+ protocols</span> instantly.
            Find the cheapest route. Save <span className="font-bold text-green-600 dark:text-green-400">30-70%</span> on every swap.
          </p>

          {/* Social proof stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
                  ${savedAmount.toLocaleString()}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Total Saved</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">12,483</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Smart Traders</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <TrendingDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">47%</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Avg Savings</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/compare" className="group">
              <Button variant="primary" size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 text-lg px-8 py-4 flex items-center gap-2">
                Compare Fees Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/directory">
              <Button variant="outline" size="lg" className="border-2 border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 text-lg px-8 py-4">
                Browse Protocols
              </Button>
            </Link>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            No wallet connection required · Compare in 5 seconds · Free forever
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Why Smart Traders Use GasLens
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            The only tool that compares every major DEX and aggregator in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group">
            <Card padding="lg" hover className="h-full border-2 border-transparent hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                  Save 30-70%
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Compare fees across 7+ protocols and aggregators. Always find the cheapest route.
                </p>
              </div>
            </Card>
          </div>

          <div className="group">
            <Card padding="lg" hover className="h-full border-2 border-transparent hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                  Real-time Data
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Live gas prices and protocol fees updated every block. Always accurate.
                </p>
              </div>
            </Card>
          </div>

          <div className="group">
            <Card padding="lg" hover className="h-full border-2 border-transparent hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                  MEV Protection
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  See MEV risk scores for each route. Protect yourself from frontrunning.
                </p>
              </div>
            </Card>
          </div>

          <div className="group">
            <Card padding="lg" hover className="h-full border-2 border-transparent hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                  Instant Results
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Get fee comparisons in under 2 seconds. One-click execution to any DEX.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 p-1">
          <div className="relative bg-white dark:bg-zinc-900 rounded-[22px] p-12 md:p-16">
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
                Ready to Stop Overpaying?
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
                Join <span className="font-bold text-blue-600 dark:text-blue-400">12,483 smart traders</span> who have saved over <span className="font-bold text-green-600 dark:text-green-400">${savedAmount.toLocaleString()}</span> on gas fees with GasLens
              </p>
              <Link href="/compare" className="group inline-block">
                <Button variant="primary" size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 text-xl px-12 py-5 flex items-center gap-3">
                  Start Comparing Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-6">
                Free forever · No signup required · Compare in seconds
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
