import { ExternalLink, CheckCircle, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PROTOCOLS } from '../lib/constants/protocols';

export default function DirectoryPage() {
  const protocols = Object.values(PROTOCOLS);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
          Protocol Directory
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Browse all supported DeFi protocols
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card padding="md">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Protocols</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {protocols.length}
            </p>
          </Card>
          <Card padding="md">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Active</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {protocols.filter(p => p.active).length}
            </p>
          </Card>
          <Card padding="md">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Audited</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {protocols.filter(p => p.audited).length}
            </p>
          </Card>
          <Card padding="md">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Blockchains</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              1
            </p>
          </Card>
        </div>

        {/* Protocol Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {protocols.map((protocol) => (
            <Card key={protocol.id} padding="lg" hover>
              <div className="flex gap-4">
                {/* Logo */}
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">
                    {protocol.name.charAt(0)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                        {protocol.name}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {protocol.type.toUpperCase()}
                        </span>
                        {protocol.active && (
                          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        )}
                        {protocol.audited && (
                          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            <Shield className="w-3 h-3" />
                            Audited
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                    {protocol.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <a
                      href={protocol.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-sm text-zinc-400 dark:text-zinc-600">
                      {protocol.chain}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Protocol CTA */}
        <Card padding="lg" className="mt-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
              Missing a protocol?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Let us know which protocols you'd like to see added to GasLens
            </p>
            <Button variant="outline" size="md">
              Request Protocol
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
