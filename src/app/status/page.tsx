'use client';

import { useState, useEffect } from 'react';
import { Activity, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface ServiceStatus {
  name: string;
  endpoint?: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance' | 'checking';
  responseTime: number;
  uptime: number;
  lastChecked: string;
}

interface ServiceCheck {
  name: string;
  endpoint: string;
  checkType: 'api' | 'mock';
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'Gas Price API',
      endpoint: '/api/gas-price',
      status: 'checking',
      responseTime: 0,
      uptime: 100,
      lastChecked: new Date().toISOString(),
    },
    {
      name: 'Protocol Fees API',
      endpoint: '/api/protocol-fees?tokenIn=ETH&tokenOut=USDC&amountIn=1&gasPrice=35',
      status: 'checking',
      responseTime: 0,
      uptime: 100,
      lastChecked: new Date().toISOString(),
    },
  ]);

  const [checking, setChecking] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 dark:text-green-400';
      case 'degraded':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      case 'maintenance':
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getStatusBg = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'degraded':
        return 'bg-yellow-100 dark:bg-yellow-900/30';
      case 'down':
        return 'bg-red-100 dark:bg-red-900/30';
      case 'maintenance':
        return 'bg-blue-100 dark:bg-blue-900/30';
    }
  };

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5" />;
      case 'degraded':
        return <AlertCircle className="w-5 h-5" />;
      case 'down':
        return <XCircle className="w-5 h-5" />;
      case 'maintenance':
        return <Clock className="w-5 h-5" />;
      case 'checking':
        return <Activity className="w-5 h-5 animate-spin" />;
    }
  };

  const getStatusText = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded Performance';
      case 'down':
        return 'Down';
      case 'maintenance':
        return 'Maintenance';
      case 'checking':
        return 'Checking...';
    }
  };

  // Check a single service endpoint
  const checkService = async (service: ServiceStatus): Promise<ServiceStatus> => {
    if (!service.endpoint) {
      return {
        ...service,
        status: 'operational',
        responseTime: 0,
        lastChecked: new Date().toISOString(),
      };
    }

    const startTime = performance.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(service.endpoint, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      // Determine status based on response and timing
      let status: ServiceStatus['status'] = 'operational';
      if (!response.ok) {
        status = 'down';
      } else if (responseTime > 3000) {
        status = 'degraded';
      }

      return {
        ...service,
        status,
        responseTime,
        lastChecked: new Date().toISOString(),
      };
    } catch (error) {
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      return {
        ...service,
        status: 'down',
        responseTime: responseTime > 10000 ? 10000 : responseTime,
        lastChecked: new Date().toISOString(),
      };
    }
  };

  // Check all services
  const checkAllServices = async () => {
    setChecking(true);

    // Check all services in parallel
    const checkedServices = await Promise.all(
      services.map((service) => checkService(service))
    );

    setServices(checkedServices);
    setChecking(false);
  };

  // Auto-check on mount
  useEffect(() => {
    checkAllServices();
  }, []);

  // Auto-refresh every 60 seconds if enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      checkAllServices();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const overallStatus: ServiceStatus['status'] = services.some((s) => s.status === 'checking')
    ? 'checking'
    : services.some((s) => s.status === 'down')
    ? 'down'
    : services.some((s) => s.status === 'degraded')
    ? 'degraded'
    : 'operational';

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-900 dark:text-zinc-50">
            System Status
          </h1>
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400">
            Real-time status of all GasLens services and integrations
          </p>
        </div>

        {/* Overall Status Banner */}
        <Card padding="lg" className={`mb-6 sm:mb-8 ${getStatusBg(overallStatus)}`}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={getStatusColor(overallStatus)}>
                  {getStatusIcon(overallStatus)}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {overallStatus === 'operational'
                      ? 'All Systems Operational'
                      : overallStatus === 'down'
                      ? 'Service Disruption'
                      : overallStatus === 'checking'
                      ? 'Checking Services...'
                      : 'Degraded Performance'}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={checkAllServices}
                  disabled={checking}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
                >
                  {checking ? 'Checking...' : 'Refresh Status'}
                </button>
              </div>
            </div>

            {/* Auto-refresh toggle */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
              <input
                type="checkbox"
                id="auto-refresh"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="auto-refresh"
                className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer"
              >
                Auto-refresh every 60 seconds
              </label>
            </div>
          </div>
        </Card>

        {/* Services List */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Service Health
          </h3>

          {services.map((service) => (
            <Card key={service.name} padding="md" className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Service Name & Status */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className={`${getStatusColor(service.status)} flex-shrink-0 mt-1`}>
                    {getStatusIcon(service.status)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1 text-sm sm:text-base">
                      {service.name}
                    </h4>
                    <p className={`text-xs sm:text-sm font-medium ${getStatusColor(service.status)}`}>
                      {getStatusText(service.status)}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 text-xs sm:text-sm">
                  <div className="flex-1 sm:flex-none">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-1">Response Time</p>
                    <p
                      className={`font-semibold ${
                        service.status === 'checking'
                          ? 'text-zinc-400 dark:text-zinc-500'
                          : service.responseTime < 1000
                          ? 'text-green-600 dark:text-green-400'
                          : service.responseTime < 3000
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {service.status === 'checking' ? '--' : `${service.responseTime}ms`}
                    </p>
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-1">Status</p>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {service.status === 'operational'
                        ? '✓ Online'
                        : service.status === 'checking'
                        ? '...'
                        : '✗ Issue'}
                    </p>
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-1">Last Check</p>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {new Date(service.lastChecked).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Rate Limits Info */}
        <Card padding="lg" className="mt-8 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-start gap-3">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2 text-sm sm:text-base">
                API Rate Limits
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <p>• Gas Price API: 30 requests per minute</p>
                <p>• Protocol Fees API: 60 requests per minute</p>
                <p>• Rate limits are per IP address and reset every minute</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Incident History */}
        <div className="mt-8 sm:mt-12">
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Recent Incidents
          </h3>
          <Card padding="lg">
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm sm:text-base">No incidents reported in the last 30 days</p>
            </div>
          </Card>
        </div>

        {/* Subscribe to Updates */}
        <Card padding="lg" className="mt-6 sm:mt-8">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3 text-sm sm:text-base">
            Subscribe to Status Updates
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Get notified when services are experiencing issues
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
