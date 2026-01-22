'use client';

import { useState } from 'react';
import { Book, ChevronRight, Search, Code, Zap, Shield, BarChart, Wallet } from 'lucide-react';
import { Card } from '../components/ui/Card';
import Link from 'next/link';

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const sections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Getting Started with GasLens
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6">
              GasLens helps you compare gas fees across DeFi protocols to find the cheapest way to
              execute your transactions.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              Quick Start
            </h3>
            <ol className="space-y-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  1.
                </span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-50">Choose Your Tokens:</strong>{' '}
                  Select the tokens you want to swap on the home page
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  2.
                </span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-50">Enter Amount:</strong> Input
                  the amount you want to swap
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  3.
                </span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-50">Compare Fees:</strong> View
                  gas costs across all supported protocols
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  4.
                </span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-50">Execute Swap:</strong> Click
                  on your preferred protocol to complete the swap
                </span>
              </li>
            </ol>
          </div>

          <Card padding="md" className="bg-blue-50 dark:bg-blue-900/20">
            <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>Tip:</strong> Gas prices change frequently. Check during off-peak hours
              (weekends, late nights UTC) for the lowest fees.
            </p>
          </Card>
        </div>
      ),
    },
    {
      id: 'supported-protocols',
      title: 'Supported Protocols',
      icon: <BarChart className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Supported Protocols
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6">
              GasLens integrates with major DeFi protocols to give you comprehensive fee comparisons.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {[
              {
                name: 'Uniswap V3',
                fee: '0.05% - 1%',
                tokens: '1000+',
                description: 'Leading DEX with concentrated liquidity',
              },
              {
                name: 'SushiSwap',
                fee: '0.3%',
                tokens: '800+',
                description: 'Community-driven DEX with multi-chain support',
              },
              {
                name: 'Curve',
                fee: '0.04%',
                tokens: 'Stablecoins',
                description: 'Optimized for stablecoin and similar asset swaps',
              },
              {
                name: 'Chainflip',
                fee: '0.1%',
                tokens: 'Major Assets',
                description: 'Cross-chain swaps without wrapped tokens',
              },
              {
                name: 'Relay',
                fee: '0.15%',
                tokens: 'Cross-chain',
                description: 'Fast cross-chain bridge and swap protocol',
              },
            ].map((protocol) => (
              <Card key={protocol.name} padding="md" className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-1">
                      {protocol.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      {protocol.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                        Fee: {protocol.fee}
                      </span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                        {protocol.tokens} tokens
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'wallet-connection',
      title: 'Wallet Connection',
      icon: <Wallet className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Connecting Your Wallet
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6">
              GasLens uses RainbowKit for secure wallet connections. We support all major Ethereum
              wallets.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              Supported Wallets
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                'MetaMask',
                'WalletConnect',
                'Coinbase Wallet',
                'Rainbow',
                'Trust Wallet',
                'Ledger',
              ].map((wallet) => (
                <div
                  key={wallet}
                  className="px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-center text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-50"
                >
                  {wallet}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              How to Connect
            </h3>
            <ol className="space-y-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  1.
                </span>
                <span>Click "Connect Wallet" button in the top right corner</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  2.
                </span>
                <span>Select your preferred wallet from the list</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  3.
                </span>
                <span>Approve the connection request in your wallet</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  4.
                </span>
                <span>Your wallet is now connected and ready to use</span>
              </li>
            </ol>
          </div>

          <Card padding="md" className="bg-yellow-50 dark:bg-yellow-900/20">
            <p className="text-xs sm:text-sm text-yellow-900 dark:text-yellow-100">
              ⚠️ <strong>Security Note:</strong> GasLens never asks for your private keys or seed
              phrase. We only request read-only access to display your balances.
            </p>
          </Card>
        </div>
      ),
    },
    {
      id: 'understanding-fees',
      title: 'Understanding Fees',
      icon: <BarChart className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Understanding Transaction Fees
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6">
              Every DeFi transaction has two types of fees: gas fees and protocol fees.
            </p>
          </div>

          <div className="space-y-4">
            <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30">
              <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-2">
                Gas Fees
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mb-3">
                Gas fees are paid to Ethereum miners/validators to process your transaction.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <li>• Varies based on network congestion</li>
                <li>• Measured in Gwei (1 Gwei = 0.000000001 ETH)</li>
                <li>• Higher gas = faster transaction confirmation</li>
                <li>• Goes to network validators, not protocols</li>
              </ul>
            </Card>

            <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30">
              <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-2">
                Protocol Fees
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mb-3">
                Protocol fees are charged by the DEX for using their liquidity pools.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <li>• Usually 0.04% - 1% of swap amount</li>
                <li>• Fixed per protocol (doesn't change)</li>
                <li>• Goes to liquidity providers</li>
                <li>• Curve has lowest fees for stablecoins (0.04%)</li>
              </ul>
            </Card>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              Total Cost Formula
            </h3>
            <Card padding="md" className="bg-zinc-100 dark:bg-zinc-800">
              <code className="text-xs sm:text-sm text-zinc-900 dark:text-zinc-50 break-all">
                Total Cost = Gas Fee (Gwei × Gas Used) + Protocol Fee (% of Amount)
              </code>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'api-usage',
      title: 'API Usage',
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Using the GasLens API
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6">
              Integrate real-time gas price data into your own applications.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              Gas Price Endpoint
            </h3>
            <Card padding="md" className="bg-zinc-900 dark:bg-zinc-950 mb-4">
              <code className="text-xs sm:text-sm text-green-400 break-all">
                GET /api/gas-price
              </code>
            </Card>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Returns current gas prices in Gwei for different priority levels.
            </p>
            <Card padding="md" className="bg-zinc-900 dark:bg-zinc-950 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-green-400">
                {`{
  "success": true,
  "data": {
    "slow": 25,
    "standard": 35,
    "fast": 45,
    "instant": 54,
    "timestamp": 1234567890
  },
  "timestamp": 1234567890
}`}
              </pre>
            </Card>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
              Protocol Fees Endpoint
            </h3>
            <Card padding="md" className="bg-zinc-900 dark:bg-zinc-950 mb-4">
              <code className="text-xs sm:text-sm text-green-400 break-all">
                GET /api/protocol-fees?tokenIn=ETH&tokenOut=USDC&amountIn=1&gasPrice=35
              </code>
            </Card>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Returns fee comparison across protocols for a specific swap.
            </p>
          </div>

          <Card padding="md" className="bg-blue-50 dark:bg-blue-900/20">
            <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
              📖 For detailed API documentation, see the{' '}
              <Link href="/docs/api" className="underline font-semibold">
                API Reference
              </Link>
            </p>
          </Card>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Security & Privacy
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6">
              Your security and privacy are our top priorities.
            </p>
          </div>

          <div className="space-y-4">
            <Card padding="md">
              <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-2">
                🔒 What We Collect
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Wallet address (when you connect)</li>
                <li>• Usage analytics (pages visited, features used)</li>
                <li>• Network requests for fee comparison</li>
              </ul>
            </Card>

            <Card padding="md">
              <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-2">
                🚫 What We Don't Collect
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Private keys or seed phrases</li>
                <li>• Transaction details or amounts</li>
                <li>• Personal identifying information</li>
                <li>• Email addresses (unless you subscribe)</li>
              </ul>
            </Card>

            <Card padding="md">
              <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-2">
                🛡️ Security Measures
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li>• All API keys stored server-side only</li>
                <li>• Rate limiting on all endpoints</li>
                <li>• Comprehensive security headers (CSP, HSTS)</li>
                <li>• Input validation and sanitization</li>
                <li>• Regular security audits</li>
              </ul>
            </Card>
          </div>

          <Card padding="md" className="bg-green-50 dark:bg-green-900/20">
            <p className="text-xs sm:text-sm text-green-900 dark:text-green-100">
              ✅ <strong>Open Source:</strong> GasLens is fully open source. You can audit our code
              on GitHub to verify our security claims.
            </p>
          </Card>
        </div>
      ),
    },
  ];

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery === ''
  );

  const activeContent = sections.find((s) => s.id === activeSection);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-900 dark:text-zinc-50">
            Documentation
          </h1>
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 mb-6">
            Everything you need to know about using GasLens
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-2">
              <h3 className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wide">
                Contents
              </h3>
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-colors text-sm sm:text-base ${
                    activeSection === section.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <span
                    className={
                      activeSection === section.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }
                  >
                    {section.icon}
                  </span>
                  <span className="flex-1">{section.title}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeSection === section.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Card padding="lg">{activeContent?.content}</Card>
          </div>
        </div>
      </div>
    </div>
  );
}
