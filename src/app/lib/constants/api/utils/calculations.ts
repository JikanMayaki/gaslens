// Fee and gas calculation utilities

export function calculateGasCost(gasLimit: number, gasPriceGwei: number, ethPrice: number): number {
  // Convert gwei to ETH, then to USD
  const gasCostInEth = (gasLimit * gasPriceGwei) / 1_000_000_000;
  return gasCostInEth * ethPrice;
}

export function calculateTotalFee(gasCostUSD: number, protocolFeeBps: number, amount: number): number {
  // Protocol fee in basis points (e.g., 30 bps = 0.3%)
  const protocolFeeUSD = (amount * protocolFeeBps) / 10000;
  return gasCostUSD + protocolFeeUSD;
}

export function calculateSavings(currentFee: number, averageFee: number): number {
  return averageFee - currentFee;
}

export function calculateSavingsPercentage(currentFee: number, averageFee: number): number {
  if (averageFee === 0) return 0;
  return ((averageFee - currentFee) / averageFee) * 100;
}

export function calculatePriceImpact(inputAmount: number, outputAmount: number, marketPrice: number): number {
  const executionPrice = inputAmount / outputAmount;
  return ((executionPrice - marketPrice) / marketPrice) * 100;
}

export function calculateSlippage(expectedOutput: number, minimumOutput: number): number {
  return ((expectedOutput - minimumOutput) / expectedOutput) * 100;
}

export function calculateAverageFee(fees: number[]): number {
  if (fees.length === 0) return 0;
  const sum = fees.reduce((acc, fee) => acc + fee, 0);
  return sum / fees.length;
}

export function calculateMedianFee(fees: number[]): number {
  if (fees.length === 0) return 0;
  const sorted = [...fees].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

export function estimateTimeFromGasPrice(gasPrice: number): number {
  // Rough estimation based on gas price
  // Fast gas (>50 gwei) = ~30 seconds
  // Standard gas (20-50 gwei) = ~2 minutes
  // Slow gas (<20 gwei) = ~5 minutes
  
  if (gasPrice > 50) return 30;
  if (gasPrice > 20) return 120;
  return 300;
}

export function convertTokenAmount(amount: number, decimals: number, toWei: boolean = true): string {
  if (toWei) {
    // Convert human-readable to wei
    return (amount * Math.pow(10, decimals)).toString();
  } else {
    // Convert wei to human-readable
    return (amount / Math.pow(10, decimals)).toFixed(6);
  }
}

export function calculateAPY(ratePerSecond: number): number {
  const secondsPerYear = 365 * 24 * 60 * 60;
  return (Math.pow(1 + ratePerSecond, secondsPerYear) - 1) * 100;
}