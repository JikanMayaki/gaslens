'use client';

import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GasLens
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/compare" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Compare Fees
            </Link>
            <Link 
              href="/directory" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Directory
            </Link>
            <a 
              href="https://docs.gaslens.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Docs
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;