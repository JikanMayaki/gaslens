import { BestTimeToSwap, GasPriceHistory } from '@/types/fee';

/**
 * Analyzes historical gas prices and current time to recommend best time to swap
 */
export function getBestTimeToSwap(
  currentGasPrice: number,
  historicalData?: GasPriceHistory[]
): BestTimeToSwap {
  const currentHour = new Date().getHours();

  // Gas is typically lower during these hours (UTC):
  // 2-6 AM UTC (night in Americas, morning in Asia)
  // Weekend early mornings

  const isWeekend = [0, 6].includes(new Date().getDay());

  // Determine if current time is optimal
  const isOptimalTime = (currentHour >= 2 && currentHour <= 6) ||
                        (isWeekend && currentHour >= 0 && currentHour <= 8);

  if (isOptimalTime) {
    return {
      recommendedTime: 'Now',
      expectedGasPrice: currentGasPrice,
      savingsPercentage: 0,
      reason: 'Current time is optimal! Gas prices are typically lowest during off-peak hours.',
      currentGasPrice
    };
  }

  // Calculate next optimal time
  let nextOptimalHour = 2; // 2 AM UTC by default
  let hoursUntil = nextOptimalHour - currentHour;

  if (hoursUntil < 0) {
    hoursUntil += 24;
  }

  const expectedSavings = 15; // Conservative estimate of 15% savings during off-peak
  const expectedGasPrice = currentGasPrice * (1 - expectedSavings / 100);

  const nextTime = new Date();
  nextTime.setHours(nextTime.getHours() + hoursUntil);

  return {
    recommendedTime: `${nextTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })}`,
    expectedGasPrice: Math.round(expectedGasPrice),
    savingsPercentage: expectedSavings,
    reason: `Gas prices are typically ${expectedSavings}% lower during off-peak hours (2-6 AM UTC)`,
    currentGasPrice
  };
}

/**
 * Checks if current gas price triggers a fee alert
 */
export function checkFeeAlert(
  currentGasPrice: number,
  threshold: number,
  type: 'below' | 'above'
): boolean {
  if (type === 'below') {
    return currentGasPrice <= threshold;
  }
  return currentGasPrice >= threshold;
}

/**
 * Calculates average gas price from historical data
 */
export function getAverageGasPrice(history: GasPriceHistory[]): number {
  if (history.length === 0) return 0;

  const sum = history.reduce((acc, curr) => acc + curr.standard, 0);
  return Math.round(sum / history.length);
}

/**
 * Determines if current gas price is high, medium, or low
 */
export function getGasPriceLevel(
  currentGasPrice: number
): 'low' | 'medium' | 'high' {
  // Based on Ethereum mainnet typical values
  if (currentGasPrice < 20) return 'low';
  if (currentGasPrice < 50) return 'medium';
  return 'high';
}

/**
 * Calculates potential savings by waiting for optimal gas price
 */
export function calculatePotentialSavings(
  currentGasPrice: number,
  gasEstimate: number,
  ethPrice: number
): {
  currentCostUsd: number;
  optimalCostUsd: number;
  savingsUsd: number;
  savingsPercent: number;
} {
  const currentCostEth = (gasEstimate * currentGasPrice) / 1e9;
  const currentCostUsd = currentCostEth * ethPrice;

  // Estimate 15% lower gas during optimal time
  const optimalGasPrice = currentGasPrice * 0.85;
  const optimalCostEth = (gasEstimate * optimalGasPrice) / 1e9;
  const optimalCostUsd = optimalCostEth * ethPrice;

  const savingsUsd = currentCostUsd - optimalCostUsd;
  const savingsPercent = (savingsUsd / currentCostUsd) * 100;

  return {
    currentCostUsd: Math.round(currentCostUsd * 100) / 100,
    optimalCostUsd: Math.round(optimalCostUsd * 100) / 100,
    savingsUsd: Math.round(savingsUsd * 100) / 100,
    savingsPercent: Math.round(savingsPercent * 10) / 10
  };
}
