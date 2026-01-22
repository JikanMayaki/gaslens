import { Card } from '../components/ui/Card';
import { Scale, Shield, AlertTriangle, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-900 dark:text-zinc-50">
            Terms and Conditions
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Last updated: January 16, 2026
          </p>
        </div>

        {/* Important Notice */}
        <Card padding="lg" className="mb-8 bg-yellow-50 dark:bg-yellow-900/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-2">
                Important Notice
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                By using GasLens, you agree to these terms. Please read them carefully. If you
                don't agree with any part of these terms, please do not use our service.
              </p>
            </div>
          </div>
        </Card>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-12">
          {/* 1. Acceptance of Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                1. Acceptance of Terms
              </h2>
            </div>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  Welcome to GasLens. By accessing or using our website, application, or API
                  (collectively, the "Service"), you agree to be bound by these Terms and
                  Conditions ("Terms").
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </div>
            </Card>
          </section>

          {/* 2. Description of Service */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                2. Description of Service
              </h2>
            </div>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>GasLens provides:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Real-time Ethereum gas price information</li>
                  <li>Fee comparisons across multiple DeFi protocols</li>
                  <li>Smart routing recommendations for token swaps</li>
                  <li>API access for developers</li>
                </ul>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  GasLens is an informational tool only. We do not execute transactions, custody
                  funds, or act as a financial intermediary.
                </p>
              </div>
            </Card>
          </section>

          {/* 3. User Responsibilities */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                3. User Responsibilities
              </h2>
            </div>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>As a user of GasLens, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate information when using the Service</li>
                  <li>
                    Comply with all applicable laws and regulations regarding cryptocurrency
                    transactions
                  </li>
                  <li>Not use the Service for any illegal or unauthorized purpose</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not abuse our API rate limits or attempt to circumvent them</li>
                  <li>Maintain the security of your wallet and private keys</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* 4. Disclaimers */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                4. Disclaimers and Limitations
              </h2>
            </div>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    IMPORTANT DISCLAIMERS:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-red-900 dark:text-red-100">
                    <li>
                      <strong>No Financial Advice:</strong> GasLens provides information only. We
                      do not provide financial, investment, or trading advice.
                    </li>
                    <li>
                      <strong>Accuracy Not Guaranteed:</strong> While we strive for accuracy, gas
                      prices and fee estimates may be outdated or incorrect.
                    </li>
                    <li>
                      <strong>Third-Party Protocols:</strong> We are not affiliated with any DeFi
                      protocols. Use them at your own risk.
                    </li>
                    <li>
                      <strong>No Liability for Losses:</strong> We are not responsible for any
                      financial losses incurred from using our Service.
                    </li>
                  </ul>
                </div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50 uppercase">
                  The Service is provided "AS IS" and "AS AVAILABLE" without any warranties of any
                  kind, either express or implied.
                </p>
              </div>
            </Card>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              5. Intellectual Property
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  The Service and its original content, features, and functionality are owned by
                  GasLens and are protected by international copyright, trademark, and other
                  intellectual property laws.
                </p>
                <p>
                  GasLens is open source under the MIT License. You may use, modify, and distribute
                  the source code in accordance with the license terms.
                </p>
              </div>
            </Card>
          </section>

          {/* 6. Privacy */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              6. Privacy and Data Collection
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  <strong>We collect minimal data:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Wallet addresses when you connect your wallet</li>
                  <li>Usage analytics (pages visited, features used)</li>
                  <li>API request logs for rate limiting and debugging</li>
                </ul>
                <p>
                  <strong>We do NOT collect:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Private keys or seed phrases</li>
                  <li>Personal identifying information</li>
                  <li>Transaction details or amounts</li>
                </ul>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-500">
                  For more details, see our Privacy Policy.
                </p>
              </div>
            </Card>
          </section>

          {/* 7. API Usage */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              7. API Usage Terms
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>If you use our API, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respect rate limits (30 requests/min for gas prices, 60 requests/min for protocol fees)</li>
                  <li>Not attempt to circumvent rate limiting mechanisms</li>
                  <li>Provide proper attribution when using our data</li>
                  <li>Not resell or redistribute our API data commercially without permission</li>
                </ul>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  We reserve the right to modify, suspend, or terminate API access at any time.
                </p>
              </div>
            </Card>
          </section>

          {/* 8. Limitation of Liability */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              8. Limitation of Liability
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50 uppercase">
                  To the maximum extent permitted by law, GasLens shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages, including
                  without limitation:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Loss of profits, revenue, or data</li>
                  <li>Financial losses from cryptocurrency transactions</li>
                  <li>Damages resulting from service downtime or errors</li>
                  <li>Losses from using third-party protocols or services</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* 9. Changes to Terms */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              9. Changes to Terms
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  We reserve the right to modify these Terms at any time. If we make material
                  changes, we will notify users by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Updating the "Last updated" date at the top of this page</li>
                  <li>Posting a notice on our homepage</li>
                  <li>Sending an email to subscribers (if applicable)</li>
                </ul>
                <p>
                  Your continued use of the Service after changes constitutes acceptance of the new
                  Terms.
                </p>
              </div>
            </Card>
          </section>

          {/* 10. Termination */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              10. Termination
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  We may terminate or suspend your access to the Service immediately, without prior
                  notice or liability, for any reason, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Breach of these Terms</li>
                  <li>Abuse of API rate limits</li>
                  <li>Illegal or fraudulent activity</li>
                  <li>Attempts to compromise service security</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* 11. Governing Law */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              11. Governing Law
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the
                  jurisdiction in which GasLens operates, without regard to its conflict of law
                  provisions.
                </p>
              </div>
            </Card>
          </section>

          {/* 12. Severability */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              12. Severability
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  If any provision of these Terms is held to be invalid or unenforceable, such
                  provision shall be struck and the remaining provisions shall be enforced.
                </p>
              </div>
            </Card>
          </section>

          {/* 13. Contact */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              13. Contact Information
            </h2>
            <Card padding="lg">
              <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                <p>If you have any questions about these Terms, please contact us at:</p>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">Email:</p>
                  <a
                    href="mailto:legal@gaslens.app"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    legal@gaslens.app
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

        {/* Agreement Footer */}
        <Card padding="lg" className="mt-8 bg-blue-50 dark:bg-blue-900/20">
          <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100 text-center">
            By using GasLens, you acknowledge that you have read, understood, and agree to be bound
            by these Terms and Conditions.
          </p>
        </Card>
      </div>
    </div>
  );
}
