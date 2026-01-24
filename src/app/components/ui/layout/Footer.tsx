import React from 'react';
import Link from 'next/link';
import { Twitter, Github, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              GasLens
            </h3>
            <p className="text-gray-600 text-xs">
              See through the fees. Choose the cheapest path.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/compare" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  Fee Comparison
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  Protocol Directory
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 text-xs transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs">
            © 2025 GasLens. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;