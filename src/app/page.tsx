'use client';

import { useState, useEffect } from 'react';
import { Menu, Search, Bell, TrendingDown, TrendingUp, Zap, Sun, Moon, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [targetGasPrice, setTargetGasPrice] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Mock gas data - replace with real API
  const currentGasPrice = 28; // Gwei
  const gasStatus = currentGasPrice < 30 ? 'low' : currentGasPrice < 50 ? 'fair' : 'high';
  const gasStatusText = gasStatus === 'low' ? 'Low' : gasStatus === 'fair' ? 'Fair' : 'High';
  const gasStatusEmoji = gasStatus === 'low' ? '🟢' : gasStatus === 'fair' ? '🟡' : '🔴';
  const gasRecommendation = gasStatus === 'low' ? 'Great time to transact!' : gasStatus === 'fair' ? 'Moderate fees expected' : 'Consider waiting or using L2';
  const totalSavings = 1247; // Mock savings in USD

  // Initialize dark mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = savedMode ? savedMode === 'true' : prefersDark;
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (typeof window !== 'undefined') {
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/compare?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSetNotification = () => {
    if (targetGasPrice) {
      setNotificationsEnabled(true);
      // In production, this would set up a notification service
      alert(`We'll notify you when gas drops to ${targetGasPrice} Gwei or lower!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              GasLens
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                ) : (
                  <Moon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200"
              >
                <Menu className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-20">
          <nav className="container mx-auto px-6 py-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                  Product
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/compare" className="block text-base text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Fee Comparison
                    </Link>
                  </li>
                  <li>
                    <Link href="/directory" className="block text-base text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Protocol Directory
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="block text-base text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                  Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/docs" className="block text-base text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/api" className="block text-base text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link href="/status" className="block text-base text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-4xl">

        {/* Weather Report Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Live Ethereum Gas Tracker</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
            Gas is {gasStatusText}
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-6xl">{gasStatusEmoji}</span>
            <div className="text-left">
              <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{currentGasPrice} <span className="text-2xl font-normal text-zinc-500">Gwei</span></p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{gasRecommendation}</p>
            </div>
          </div>

          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            We monitor Ethereum network conditions 24/7 so you never overpay
          </p>
        </div>

        {/* Search Centerpiece */}
        <div className="mb-16">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transaction, address, or ENS name..."
                className="w-full pl-14 pr-6 py-5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl text-base text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg shadow-gray-100 dark:shadow-zinc-900/50 transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {/* Savings Tracker Card */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Your Total Savings</h3>
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">${totalSavings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <TrendingDown className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Saved by waiting for optimal gas prices</p>
          </div>

          {/* Gas Alerts Card */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Set Gas Alert</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={targetGasPrice}
                    onChange={(e) => setTargetGasPrice(e.target.value)}
                    placeholder="20"
                    className="w-20 px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSetNotification}
                    disabled={!targetGasPrice}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    Notify Me
                  </button>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Get notified when gas drops to your target</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Quick Actions</h2>

          <Link
            href="/compare"
            className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <Zap className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Compare Protocols</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Find the cheapest way to swap</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </Link>

          <Link
            href="/directory"
            className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <Search className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Protocol Directory</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Browse all supported protocols</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </Link>
        </div>

      </main>
    </div>
  );
}
