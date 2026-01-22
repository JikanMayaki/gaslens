'use client';

import { useState } from 'react';
import { Code, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';

interface CodeExample {
  language: string;
  code: string;
}

export default function APIReferencePage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      id: 'gas-price',
      method: 'GET',
      path: '/api/gas-price',
      title: 'Get Gas Prices',
      description: 'Fetch current Ethereum gas prices for different priority levels.',
      rateLimit: '30 requests per minute',
      parameters: [],
      response: {
        success: true,
        data: {
          slow: 25,
          standard: 35,
          fast: 45,
          instant: 54,
          timestamp: 1234567890,
        },
        timestamp: 1234567890,
      },
      examples: [
        {
          language: 'JavaScript',
          code: `fetch('https://gaslens.app/api/gas-price')
  .then(res => res.json())
  .then(data => {
    console.log('Gas prices:', data);
  });`,
        },
        {
          language: 'Python',
          code: `import requests

response = requests.get('https://gaslens.app/api/gas-price')
data = response.json()
print(f"Standard gas: {data['data']['standard']} Gwei")`,
        },
        {
          language: 'cURL',
          code: `curl https://gaslens.app/api/gas-price`,
        },
      ],
    },
    {
      id: 'protocol-fees',
      method: 'GET',
      path: '/api/protocol-fees',
      title: 'Compare Protocol Fees',
      description: 'Get fee comparison across all supported protocols for a specific token pair.',
      rateLimit: '60 requests per minute',
      parameters: [
        {
          name: 'tokenIn',
          type: 'string',
          required: true,
          description: 'Token symbol to swap from (e.g., ETH, USDC)',
        },
        {
          name: 'tokenOut',
          type: 'string',
          required: true,
          description: 'Token symbol to swap to (e.g., USDC, DAI)',
        },
        {
          name: 'amountIn',
          type: 'string',
          required: true,
          description: 'Amount to swap (in tokenIn units)',
        },
        {
          name: 'gasPrice',
          type: 'string',
          required: false,
          description: 'Current gas price in Gwei (defaults to 35)',
        },
      ],
      response: {
        success: true,
        data: [
          {
            protocolId: 'uniswap-v3',
            protocolName: 'Uniswap V3',
            baseFeeBps: 30,
            gasEstimate: 150000,
            totalFeeUsd: 15.75,
          },
        ],
        timestamp: 1234567890,
      },
      examples: [
        {
          language: 'JavaScript',
          code: `const params = new URLSearchParams({
  tokenIn: 'ETH',
  tokenOut: 'USDC',
  amountIn: '1',
  gasPrice: '35'
});

fetch(\`https://gaslens.app/api/protocol-fees?\${params}\`)
  .then(res => res.json())
  .then(data => {
    console.log('Protocol fees:', data);
  });`,
        },
        {
          language: 'Python',
          code: `import requests

params = {
    'tokenIn': 'ETH',
    'tokenOut': 'USDC',
    'amountIn': '1',
    'gasPrice': '35'
}

response = requests.get(
    'https://gaslens.app/api/protocol-fees',
    params=params
)
data = response.json()
print(data)`,
        },
        {
          language: 'cURL',
          code: `curl "https://gaslens.app/api/protocol-fees?tokenIn=ETH&tokenOut=USDC&amountIn=1&gasPrice=35"`,
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-900 dark:text-zinc-50">
            API Reference
          </h1>
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 mb-6">
            Complete reference for the GasLens API endpoints
          </p>

          <Card padding="md" className="bg-blue-50 dark:bg-blue-900/20">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100 mb-2">
                  <strong>Base URL:</strong>{' '}
                  <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded text-xs break-all">
                    https://gaslens.app
                  </code>
                </p>
                <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                  All endpoints return JSON. Rate limits are enforced per IP address.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Authentication */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Authentication
          </h2>
          <Card padding="lg">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-4">
              The GasLens API is currently <strong>free and public</strong>. No authentication
              required.
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-500">
              API keys will be required for higher rate limits in the future.
            </p>
          </Card>
        </div>

        {/* Rate Limits */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Rate Limits
          </h2>
          <Card padding="lg">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-3 pr-4 font-semibold text-zinc-900 dark:text-zinc-50">
                      Endpoint
                    </th>
                    <th className="text-left py-3 font-semibold text-zinc-900 dark:text-zinc-50">
                      Rate Limit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">
                      /api/gas-price
                    </td>
                    <td className="py-3 text-zinc-600 dark:text-zinc-400">
                      30 requests/minute
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">
                      /api/protocol-fees
                    </td>
                    <td className="py-3 text-zinc-600 dark:text-zinc-400">
                      60 requests/minute
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-500 mt-4">
              Rate limits reset every 60 seconds. When exceeded, you'll receive a{' '}
              <code className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded">429</code> status code.
            </p>
          </Card>
        </div>

        {/* Endpoints */}
        <div className="space-y-8 sm:space-y-12">
          {endpoints.map((endpoint) => (
            <div key={endpoint.id} id={endpoint.id}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    {endpoint.title}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    {endpoint.description}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs sm:text-sm font-semibold self-start">
                  {endpoint.method}
                </span>
              </div>

              {/* Endpoint Path */}
              <Card padding="md" className="bg-zinc-900 dark:bg-zinc-950 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <code className="text-xs sm:text-sm text-green-400 flex-1 break-all">
                    {endpoint.method} {endpoint.path}
                  </code>
                  <button
                    onClick={() => copyToClipboard(endpoint.path, endpoint.id)}
                    className="flex items-center gap-2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-xs text-zinc-300 transition-colors self-start sm:self-auto"
                  >
                    {copiedEndpoint === endpoint.id ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </Card>

              {/* Rate Limit Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Rate Limit: {endpoint.rateLimit}
                </span>
              </div>

              {/* Parameters */}
              {endpoint.parameters.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
                    Parameters
                  </h3>
                  <Card padding="none">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-zinc-200 dark:border-zinc-700">
                            <th className="text-left py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-50">
                              Name
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-50">
                              Type
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-50">
                              Required
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-50">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.parameters.map((param, idx) => (
                            <tr
                              key={param.name}
                              className={
                                idx !== endpoint.parameters.length - 1
                                  ? 'border-b border-zinc-200 dark:border-zinc-700'
                                  : ''
                              }
                            >
                              <td className="py-3 px-4">
                                <code className="text-blue-600 dark:text-blue-400 font-mono">
                                  {param.name}
                                </code>
                              </td>
                              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                                {param.type}
                              </td>
                              <td className="py-3 px-4">
                                {param.required ? (
                                  <span className="text-red-600 dark:text-red-400 font-semibold">
                                    Yes
                                  </span>
                                ) : (
                                  <span className="text-zinc-500 dark:text-zinc-500">No</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                                {param.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}

              {/* Response */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
                  Response
                </h3>
                <Card padding="md" className="bg-zinc-900 dark:bg-zinc-950 overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-green-400">
                    {JSON.stringify(endpoint.response, null, 2)}
                  </pre>
                </Card>
              </div>

              {/* Code Examples */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50">
                  Examples
                </h3>
                <div className="space-y-4">
                  {endpoint.examples.map((example) => (
                    <div key={example.language}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                          {example.language}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(example.code, `${endpoint.id}-${example.language}`)
                          }
                          className="flex items-center gap-2 px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-xs text-zinc-600 dark:text-zinc-400 transition-colors"
                        >
                          {copiedEndpoint === `${endpoint.id}-${example.language}` ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <Card padding="md" className="bg-zinc-900 dark:bg-zinc-950 overflow-x-auto">
                        <pre className="text-xs sm:text-sm text-green-400">{example.code}</pre>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error Codes */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Error Codes
          </h2>
          <Card padding="lg">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-3 pr-4 font-semibold text-zinc-900 dark:text-zinc-50">
                      Code
                    </th>
                    <th className="text-left py-3 font-semibold text-zinc-900 dark:text-zinc-50">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: 200, desc: 'Success - Request completed successfully' },
                    { code: 400, desc: 'Bad Request - Invalid parameters' },
                    { code: 429, desc: 'Too Many Requests - Rate limit exceeded' },
                    { code: 500, desc: 'Internal Server Error - Something went wrong' },
                  ].map((error, idx, arr) => (
                    <tr
                      key={error.code}
                      className={idx !== arr.length - 1 ? 'border-b border-zinc-200 dark:border-zinc-700' : ''}
                    >
                      <td className="py-3 pr-4">
                        <code className="font-mono font-semibold text-zinc-900 dark:text-zinc-50">
                          {error.code}
                        </code>
                      </td>
                      <td className="py-3 text-zinc-600 dark:text-zinc-400">{error.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Support */}
        <Card padding="lg" className="mt-8 bg-blue-50 dark:bg-blue-900/20">
          <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-2">
            Need Help?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
            Found a bug or have questions? Open an issue on{' '}
            <a
              href="https://github.com/yourusername/gaslens"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              GitHub
            </a>{' '}
            or contact us at{' '}
            <a href="mailto:support@gaslens.app" className="text-blue-600 dark:text-blue-400 underline">
              support@gaslens.app
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
