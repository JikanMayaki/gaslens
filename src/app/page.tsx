'use client';

import { useState } from 'react';
import { Search, Bell, ArrowUpRight, FileText, Send } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [targetGasPrice, setTargetGasPrice] = useState(12);
  const [selectedTxType, setSelectedTxType] = useState('Swap on Uniswap');

  // Mock data
  const currentGasPrice = 12; // Gwei
  const gasStatus = currentGasPrice < 20 ? 'Low' : currentGasPrice < 40 ? 'Fair' : 'High';
  const gasStatusColor = currentGasPrice < 20 ? 'text-emerald-600' : currentGasPrice < 40 ? 'text-blue-600' : 'text-orange-600';
  const avgConfirmation = currentGasPrice < 20 ? '<2 min' : currentGasPrice < 40 ? '3-5 min' : '5-10 min';

  const recentActivity = [
    { type: 'Send', from: '0xec9', to: '4ab...', status: 'Confirmed', icon: Send },
    { type: 'Contract', from: '0xfc5', to: '4ab...', status: 'Pending', icon: FileText },
    { type: 'Send', from: '0xe97', to: '4ab...', status: 'Confirmed', icon: Send },
    { type: 'Send', from: '0xec9', to: '4ab...', status: 'Pending', icon: Send },
  ];

  const txTypes = [
    'Swap on Uniswap',
    'Mint NFT',
  ];

  const estimatedCost = selectedTxType === 'Swap on Uniswap' ? 2.50 : 4.20;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/compare?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleNotify = () => {
    alert(`We'll notify you when gas drops to ${targetGasPrice} Gwei or lower!`);
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-900">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero - Gas Status */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Ethereum gas is currently <span className={gasStatusColor}>{gasStatus}</span>.
          </h1>
          <div className="inline-flex items-center justify-center px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-3">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{currentGasPrice} Gwei</span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Great time for transactions. Average confirmation in {avgConfirmation}.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Tx Hash, Address, or ENS domain..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </form>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent Activity */}
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 card-hover cursor-pointer">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{activity.type}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500">
                        {activity.from} → {activity.to}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'Confirmed'
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 24h Gas Trend */}
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 card-hover cursor-pointer">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">24h Gas Trend</h2>
            <div className="relative h-40 mb-4">
              {/* Simple mock chart */}
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <path
                  d="M 0,80 Q 50,20 100,40 T 200,30 T 300,60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-600 dark:text-blue-400"
                />
                <path
                  d="M 0,80 Q 50,20 100,40 T 200,30 T 300,60 L 300,100 L 0,100 Z"
                  fill="currentColor"
                  className="text-blue-600/10 dark:text-blue-400/10"
                />
              </svg>
              <div className="absolute top-1/2 right-8 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                Average: 15 Gwei
              </div>
            </div>
            <Link href="/status" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View Report
            </Link>
          </div>

          {/* Estimate Cost */}
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 card-hover cursor-pointer">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Estimate Cost</h2>

            <div className="mb-4">
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Transaction Type
              </label>
              <div className="relative">
                <select
                  value={selectedTxType}
                  onChange={(e) => setSelectedTxType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  {txTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Estimated Cost</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">~${estimatedCost.toFixed(2)}</p>
                  <p className="text-xs text-zinc-500">in ETH</p>
                </div>
              </div>
            </div>

            <Link
              href="/compare"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              Set Alert for lower price
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Gas Alert - Full Width */}
          <div className="lg:col-span-3 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 card-hover">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Gas Alert</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Set your target Gwei.</p>

                <div className="max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Target Gas Price</span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{targetGasPrice} Gwei</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={targetGasPrice}
                    onChange={(e) => setTargetGasPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-zinc-500 mt-1">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNotify}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2 justify-center md:self-end"
              >
                <Bell className="w-4 h-4" />
                Notify me
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
