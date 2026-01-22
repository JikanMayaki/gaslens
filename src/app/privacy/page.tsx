import { Card } from '../components/ui/Card';
import { Shield, Eye, Lock, Database, Users, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-900 dark:text-zinc-50">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Last updated: January 22, 2026
          </p>
        </div>

        {/* Important Notice */}
        <Card padding="lg" className="mb-8 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-2">
                Your Privacy Matters
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                GasLens is committed to protecting your privacy. We collect minimal data and never
                share your information with third parties. This policy explains what we collect and
                how we use it.
              </p>
            </div>
          </div>
        </Card>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-12">
          {/* 1. Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                1. Information We Collect
              </h2>
            </div>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    a) Information You Provide
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Wallet Address:</strong> When you connect your wallet (MetaMask,
                      WalletConnect, etc.), we temporarily store your public wallet address to
                      display your balances
                    </li>
                    <li>
                      <strong>Email Address:</strong> Only if you subscribe to status updates or
                      newsletters (optional)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    b) Information Automatically Collected
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Usage Data:</strong> Pages visited, features used, time spent
                    </li>
                    <li>
                      <strong>Device Information:</strong> Browser type, operating system, device
                      type
                    </li>
                    <li>
                      <strong>IP Address:</strong> For rate limiting and security purposes
                    </li>
                    <li>
                      <strong>API Requests:</strong> Endpoints called, response times, errors
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    ✅ What We DON'T Collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-green-900 dark:text-green-100">
                    <li>Private keys or seed phrases</li>
                    <li>Transaction details or amounts</li>
                    <li>Personal identifying information (name, address, phone)</li>
                    <li>Financial information (bank accounts, credit cards)</li>
                    <li>Browsing history outside GasLens</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                2. How We Use Your Information
              </h2>
            </div>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Provide the Service:</strong> Display gas prices, calculate fees, show
                    token balances
                  </li>
                  <li>
                    <strong>Improve the Service:</strong> Understand which features are used,
                    identify bugs, optimize performance
                  </li>
                  <li>
                    <strong>Security:</strong> Prevent abuse, implement rate limiting, detect
                    fraudulent activity
                  </li>
                  <li>
                    <strong>Communication:</strong> Send status updates, security alerts (only if
                    you subscribed)
                  </li>
                  <li>
                    <strong>Analytics:</strong> Understand user behavior to prioritize features
                  </li>
                </ul>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                  <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                    <strong>Note:</strong> We use analytics to improve the service, but we don't
                    sell your data or share it with advertisers.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* 3. How We Share Your Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                3. How We Share Your Information
              </h2>
            </div>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  We do NOT sell, rent, or trade your personal information.
                </p>
                <p>We may share information only in these limited circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Service Providers:</strong> Vercel (hosting), Etherscan (gas prices) -
                    only what's necessary to operate the service
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> If required by law, court order, or
                    government request
                  </li>
                  <li>
                    <strong>Security:</strong> To prevent fraud, abuse, or security threats
                  </li>
                  <li>
                    <strong>Business Transfer:</strong> If GasLens is acquired (with your consent)
                  </li>
                </ul>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-4">
                  <p className="text-xs sm:text-sm text-purple-900 dark:text-purple-100">
                    <strong>Blockchain Transparency:</strong> Remember that all blockchain
                    transactions are public. GasLens doesn't make your transactions public - the
                    blockchain does.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* 4. Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                4. Data Security
              </h2>
            </div>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>We implement industry-standard security measures:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>HTTPS Encryption:</strong> All data transmitted between your browser and
                    our servers is encrypted
                  </li>
                  <li>
                    <strong>API Key Protection:</strong> API keys stored server-side only, never
                    exposed to client
                  </li>
                  <li>
                    <strong>Rate Limiting:</strong> Protection against DDoS and abuse
                  </li>
                  <li>
                    <strong>Security Headers:</strong> CSP, HSTS, X-Frame-Options implemented
                  </li>
                  <li>
                    <strong>Input Validation:</strong> All inputs sanitized and validated
                  </li>
                  <li>
                    <strong>Regular Audits:</strong> Security reviews and dependency updates
                  </li>
                </ul>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
                  <p className="text-xs sm:text-sm text-yellow-900 dark:text-yellow-100">
                    ⚠️ <strong>Your Responsibility:</strong> Keep your wallet private keys secure.
                    We never ask for your private keys or seed phrase.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* 5. Cookies and Tracking */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              5. Cookies and Tracking
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>GasLens uses minimal cookies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the service to function
                    (wallet connection, preferences)
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> To understand usage patterns (can be
                    disabled)
                  </li>
                </ul>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  We do NOT use advertising or tracking cookies.
                </p>
              </div>
            </Card>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              6. Your Rights
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request a copy of your data
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your data (disconnect wallet,
                    unsubscribe from emails)
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate data
                  </li>
                  <li>
                    <strong>Portability:</strong> Request your data in a portable format
                  </li>
                  <li>
                    <strong>Opt-Out:</strong> Opt out of analytics or marketing communications
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-500 mt-4">
                  To exercise these rights, contact us at{' '}
                  <a
                    href="mailto:privacy@gaslens.app"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    privacy@gaslens.app
                  </a>
                </p>
              </div>
            </Card>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              7. Data Retention
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Wallet Addresses:</strong> Stored only while connected (session-based)
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Retained for 90 days, then anonymized or deleted
                  </li>
                  <li>
                    <strong>API Logs:</strong> Retained for 30 days for debugging and security
                  </li>
                  <li>
                    <strong>Email Addresses:</strong> Until you unsubscribe
                  </li>
                </ul>
              </div>
            </Card>
          </section>

          {/* 8. Third-Party Services */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              8. Third-Party Services
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>GasLens integrates with third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Etherscan:</strong> Gas price data (see{' '}
                    <a
                      href="https://etherscan.io/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      Etherscan Privacy Policy
                    </a>
                    )
                  </li>
                  <li>
                    <strong>Vercel:</strong> Hosting (see{' '}
                    <a
                      href="https://vercel.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      Vercel Privacy Policy
                    </a>
                    )
                  </li>
                  <li>
                    <strong>WalletConnect:</strong> Wallet connections (see{' '}
                    <a
                      href="https://walletconnect.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      WalletConnect Privacy
                    </a>
                    )
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-500">
                  These services have their own privacy policies. We are not responsible for their
                  practices.
                </p>
              </div>
            </Card>
          </section>

          {/* 9. Children's Privacy */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              9. Children's Privacy
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  GasLens is not intended for children under 18. We do not knowingly collect
                  information from children. If you are a parent and believe your child has
                  provided us with information, contact us immediately.
                </p>
              </div>
            </Card>
          </section>

          {/* 10. International Users */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              10. International Users
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  GasLens is hosted on servers in the United States. By using the service, you
                  consent to the transfer of your data to the U.S. We comply with applicable data
                  protection laws, including GDPR for EU users.
                </p>
              </div>
            </Card>
          </section>

          {/* 11. Changes to This Policy */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              11. Changes to This Policy
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.</p>
                <p>
                  For material changes, we will notify you via email (if provided) or a prominent
                  notice on the website.
                </p>
              </div>
            </Card>
          </section>

          {/* 12. Contact Us */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              12. Contact Us
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>If you have questions about this Privacy Policy, contact us:</p>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">Email:</p>
                  <a
                    href="mailto:privacy@gaslens.app"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    privacy@gaslens.app
                  </a>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50 mt-3">GitHub:</p>
                  <a
                    href="https://github.com/yourusername/gaslens"
                    className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                  >
                    https://github.com/yourusername/gaslens
                  </a>
                </div>
              </div>
            </Card>
          </section>
        </div>

        {/* Summary Footer */}
        <Card padding="lg" className="mt-8 bg-green-50 dark:bg-green-900/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-green-900 dark:text-green-100 font-semibold mb-2">
                In Summary:
              </p>
              <ul className="text-xs sm:text-sm text-green-900 dark:text-green-100 space-y-1">
                <li>✅ We collect minimal data</li>
                <li>✅ We never sell your information</li>
                <li>✅ We implement strong security</li>
                <li>✅ You can delete your data anytime</li>
                <li>✅ We're transparent about our practices</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
