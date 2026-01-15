'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X, TrendingUp } from 'lucide-react';
import { useGasPrice } from '@/app/lib/hooks/useGasPrice';
import { formatGwei } from '@/app/lib/constants/api/utils/formatting';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { gasPrice } = useGasPrice();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-md border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-all group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GasLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Gas Price Ticker */}
            {gasPrice && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg border border-green-200 dark:border-green-800/50">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Gas:</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400 tabular-nums">
                    {formatGwei(gasPrice.standard || 35)}
                  </span>
                </div>
              </div>
            )}

            <Link
              href="/compare"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
            >
              Compare
            </Link>
            <Link
              href="/directory"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
            >
              Directory
            </Link>
            <a
              href="https://docs.gaslens.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
            >
              Docs
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ConnectButton />
            <Link href="/compare" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-zinc-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/compare"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare Fees
              </Link>
              <Link
                href="/directory"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Directory
              </Link>
              <a
                href="https://docs.gaslens.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-4 py-2"
              >
                Docs
              </a>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
                <Link
                  href="/compare"
                  className="px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;