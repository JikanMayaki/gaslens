import { z } from 'zod';

// Ethereum address validation
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Transaction hash validation
export function isValidTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

// Amount validation
export function isValidAmount(amount: string | number): boolean {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && num > 0 && isFinite(num);
}

// Slippage validation (should be between 0.1% and 50%)
export function isValidSlippage(slippage: number): boolean {
  return slippage >= 0.1 && slippage <= 50;
}

// Zod schemas for API validation
export const SwapParamsSchema = z.object({
  fromToken: z.string().refine(isValidAddress, 'Invalid token address'),
  toToken: z.string().refine(isValidAddress, 'Invalid token address'),
  amount: z.number().positive('Amount must be positive'),
  slippage: z.number().min(0.1).max(50).optional(),
});

export const FeeAlertSchema = z.object({
  transactionType: z.enum(['swap', 'bridge', 'transfer', 'stake', 'unstake', 'lend', 'borrow', 'mint', 'burn']),
  maxFee: z.number().positive('Max fee must be positive'),
  notifyVia: z.array(z.enum(['email', 'push'])).min(1, 'Select at least one notification method'),
});

export const GasPriceSchema = z.object({
  safe: z.number().nonnegative(),
  standard: z.number().nonnegative(),
  fast: z.number().nonnegative(),
  instant: z.number().nonnegative(),
});

// Input sanitization
export function sanitizeAmount(input: string): string {
  // Remove everything except numbers and decimal point
  return input.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
}

export function sanitizeAddress(input: string): string {
  // Remove whitespace and ensure lowercase
  return input.trim().toLowerCase();
}

// Rate limiting helper
export function createRateLimiter(maxCalls: number, windowMs: number) {
  const calls: number[] = [];
  
  return function() {
    const now = Date.now();
    // Remove calls outside the time window
    while (calls.length > 0 && calls[0] < now - windowMs) {
      calls.shift();
    }
    
    if (calls.length >= maxCalls) {
      return false; // Rate limit exceeded
    }
    
    calls.push(now);
    return true; // Call allowed
  };
}