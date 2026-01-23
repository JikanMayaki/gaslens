'use client';

import { useState } from 'react';
import { Menu, RefreshCw, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { POPULAR_TOKENS } from './lib/constants/tokens';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDT');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [mevProtection, setMevProtection] = useState(false);

  // Network congestion detection (mock for now)
  const networkCongested = true;
  const potentialSavings = 45;

  const handleCompare = () => {
    if (fromAmount && fromToken && toToken) {
      window.location.href = `/compare?tokenIn=${fromToken}&tokenOut=${toToken}&amountIn=${fromAmount}`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GasLens
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Menu className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-20">
          <nav className="container mx-auto px-6 py-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                  Product
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/compare"
                      className="block text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Fee Comparison
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/directory"
                      className="block text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Protocol Directory
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="block text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                  Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/docs"
                      className="block text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/api"
                      className="block text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/status"
                      className="block text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      System Status
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-2xl">
        {/* Hero Text */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 leading-tight">
            The Smartest Way to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Swap</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-4">
            We scan 20+ protocols to find you the lowest fees and zero hidden slippage.
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
            <RefreshCw className="w-4 h-4" />
            <span>Fees are constantly updated</span>
          </div>
        </div>

        {/* Swap Interface */}
        <div className="space-y-6">
          {/* From Token */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {POPULAR_TOKENS.slice(0, 10).map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-semibold text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center -my-3 relative z-10">
            <button
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
              }}
              className="p-3 bg-white dark:bg-zinc-900 border-4 border-white dark:border-zinc-950 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowDown className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {POPULAR_TOKENS.slice(0, 10).map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-semibold text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          {/* MEV Protection Toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Enable MEV Protection
            </span>
            <button
              onClick={() => setMevProtection(!mevProtection)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                mevProtection
                  ? 'bg-blue-600'
                  : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  mevProtection ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Compare Button */}
          <button
            onClick={handleCompare}
            disabled={!fromAmount}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-zinc-300 disabled:to-zinc-300 dark:disabled:from-zinc-700 dark:disabled:to-zinc-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
          >
            Compare Protocols
          </button>

          {/* Network Congestion Warning */}
          {networkCongested && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-xl p-4">
              <p className="text-sm text-yellow-900 dark:text-yellow-100">
                <span className="font-semibold">Network congestion detected.</span> We recommend an L2 bridge to save ~${potentialSavings}.
              </p>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              GasLens
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              See through the fees. Choose the cheapest path
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/compare"
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Fee Comparison
                  </Link>
                </li>
                <li>
                  <Link
                    href="/directory"
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Protocol Directory
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/api"
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="/status"
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-500">
            © 2026 GasLens. All rights reserved.
          </div>
        </div>
      </main>
    </div>
  );
}
