'use client';

import { useState, useEffect, useCallback } from 'react';

export interface GasAlert {
  id: string;
  name: string;
  targetGwei: number;
  network: string;
  active: boolean;
  createdAt: number;
}

const STORAGE_KEY = 'gaslens_alerts';

// Default alerts for new users
const DEFAULT_ALERTS: GasAlert[] = [
  {
    id: '1',
    name: 'Low Gas Alert',
    targetGwei: 15,
    network: 'Ethereum',
    active: true,
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'Super Low',
    targetGwei: 10,
    network: 'Ethereum',
    active: false,
    createdAt: Date.now(),
  },
];

export function useAlerts() {
  const [alerts, setAlerts] = useState<GasAlert[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load alerts from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Validate that it's an array
          if (Array.isArray(parsed)) {
            setAlerts(parsed);
          } else {
            setAlerts(DEFAULT_ALERTS);
          }
        } else {
          // First time user - set default alerts
          setAlerts(DEFAULT_ALERTS);
        }
      } catch (error) {
        console.error('Error loading alerts from localStorage:', error);
        setAlerts(DEFAULT_ALERTS);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever alerts change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
      } catch (error) {
        console.error('Error saving alerts to localStorage:', error);
      }
    }
  }, [alerts, isLoaded]);

  const createAlert = useCallback((alert: Omit<GasAlert, 'id' | 'createdAt'>) => {
    const newAlert: GasAlert = {
      ...alert,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setAlerts(prev => [...prev, newAlert]);
    return newAlert;
  }, []);

  const updateAlert = useCallback((id: string, updates: Partial<Omit<GasAlert, 'id' | 'createdAt'>>) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, ...updates } : alert
      )
    );
  }, []);

  const deleteAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const toggleAlert = useCallback((id: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  }, []);

  const getActiveAlerts = useCallback(() => {
    return alerts.filter(alert => alert.active);
  }, [alerts]);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
    alerts,
    isLoaded,
    createAlert,
    updateAlert,
    deleteAlert,
    toggleAlert,
    getActiveAlerts,
    clearAllAlerts,
  };
}
