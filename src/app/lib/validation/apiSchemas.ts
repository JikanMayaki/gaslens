/**
 * SECURITY FIX: Zod validation schemas for API endpoints
 *
 * These schemas ensure all incoming data is validated and sanitized
 * before being processed by the application.
 */

import { z } from 'zod';

/**
 * Token symbol validation
 * - Allows only alphanumeric characters
 * - Max length of 20 characters
 */
export const tokenSymbolSchema = z
  .string()
  .regex(/^[A-Z0-9]+$/i, 'Token must contain only alphanumeric characters')
  .max(20, 'Token symbol too long');

/**
 * Ethereum address validation
 * - Must be a valid hex string starting with 0x
 * - Must be exactly 42 characters (0x + 40 hex chars)
 */
export const ethereumAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address');

/**
 * Amount validation
 * - Must be a positive number
 * - Must not exceed 1 million
 */
export const amountSchema = z
  .string()
  .refine((val) => !isNaN(parseFloat(val)), 'Amount must be a number')
  .refine((val) => parseFloat(val) > 0, 'Amount must be positive')
  .refine((val) => parseFloat(val) <= 1000000, 'Amount exceeds maximum');

/**
 * Gas price validation (in gwei)
 * - Must be a positive number
 * - Must not exceed 10,000 gwei
 */
export const gasPriceSchema = z
  .string()
  .optional()
  .refine(
    (val) => !val || !isNaN(parseFloat(val)),
    'Gas price must be a number'
  )
  .refine(
    (val) => !val || parseFloat(val) > 0,
    'Gas price must be positive'
  )
  .refine(
    (val) => !val || parseFloat(val) <= 10000,
    'Gas price exceeds maximum'
  );

/**
 * Protocol fees endpoint validation
 */
export const protocolFeesQuerySchema = z.object({
  tokenIn: tokenSymbolSchema,
  tokenOut: tokenSymbolSchema,
  amountIn: amountSchema,
  gasPrice: gasPriceSchema,
});

export type ProtocolFeesQuery = z.infer<typeof protocolFeesQuerySchema>;

/**
 * Helper function to parse and validate query parameters
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with parsed data or errors
 */
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: result.error.issues.map((issue) => issue.message),
  };
}
