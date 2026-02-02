'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Plus, Trash2, Edit } from 'lucide-react';

interface Alert {
  id: string;
  name: string;
  targetGwei: number;
  network: string;
  active: boolean;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', name: 'Low Gas Alert', targetGwei: 15, network: 'Ethereum', active: true },
    { id: '2', name: 'Super Low', targetGwei: 10, network: 'Ethereum', active: false },
  ]);

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Gas Alerts</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Get notified when gas prices drop to your target
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Alert</span>
          </button>
        </div>

        {/* Alerts List */}
        {alerts.length === 0 ? (
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-12 text-center">
            <Bell className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">No alerts yet</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              Create your first gas alert to get notified when prices drop
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
              Create Alert
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 card-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleAlert(alert.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        alert.active ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-700'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          alert.active ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>

                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                        {alert.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <span>Target: <strong className="text-zinc-900 dark:text-zinc-50">{alert.targetGwei} Gwei</strong></span>
                        <span>•</span>
                        <span>{alert.network}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      aria-label="Edit alert"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      aria-label="Delete alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-6">
          <div className="flex gap-3">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                How alerts work
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                We'll monitor gas prices 24/7 and send you a browser notification when the price drops to or below your target. Make sure to enable notifications in your browser settings.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
