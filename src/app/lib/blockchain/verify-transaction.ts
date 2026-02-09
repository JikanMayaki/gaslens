import { parseUnits, formatUnits } from 'viem';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_WALLET_ADDRESS?.toLowerCase();

// Only accept Ethereum mainnet
const ALLOWED_CHAIN_ID = 1;
const MINIMUM_CONFIRMATIONS = 3;

// Price tolerance (5% to account for slippage/timing)
const PRICE_TOLERANCE = 0.05;

interface TransactionReceipt {
  status: string;
  blockNumber: string;
  confirmations: string;
  from: string;
  to: string;
  value: string;
  input: string;
  isError: string;
}

interface EtherscanResponse {
  status: string;
  message: string;
  result: TransactionReceipt;
}

export interface VerificationResult {
  valid: boolean;
  error?: string;
  details?: {
    from: string;
    to: string;
    value: string;
    blockNumber: number;
    confirmations: number;
  };
}

/**
 * Verify ETH payment transaction on-chain
 */
export async function verifyEthPayment(
  txHash: string,
  expectedAmountUSD: number,
  currentEthPriceUSD: number
): Promise<VerificationResult> {
  if (!ETHERSCAN_API_KEY) {
    return { valid: false, error: 'Etherscan API not configured' };
  }

  if (!TREASURY_ADDRESS || TREASURY_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return { valid: false, error: 'Treasury wallet not configured' };
  }

  try {
    // Fetch transaction receipt from Etherscan
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${ETHERSCAN_API_KEY}`;
    const response = await fetch(url);
    const data: EtherscanResponse = await response.json();

    if (data.status === '0' || !data.result) {
      return { valid: false, error: 'Transaction not found on Ethereum mainnet' };
    }

    const receipt = data.result;

    // Check 1: Transaction succeeded
    if (receipt.status !== '0x1') {
      return { valid: false, error: 'Transaction failed on-chain' };
    }

    // Check 2: Transaction has error flag
    if (receipt.isError === '1') {
      return { valid: false, error: 'Transaction contains errors' };
    }

    // Fetch transaction details
    const txUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${ETHERSCAN_API_KEY}`;
    const txResponse = await fetch(txUrl);
    const txData = await txResponse.json();

    if (!txData.result) {
      return { valid: false, error: 'Could not fetch transaction details' };
    }

    const tx = txData.result;

    // Check 3: Recipient is treasury wallet
    if (tx.to?.toLowerCase() !== TREASURY_ADDRESS) {
      return {
        valid: false,
        error: `Payment sent to wrong address. Expected ${TREASURY_ADDRESS}, got ${tx.to}`
      };
    }

    // Check 4: Minimum confirmations
    const blockNumber = parseInt(receipt.blockNumber, 16);

    // Get current block number
    const blockUrl = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${ETHERSCAN_API_KEY}`;
    const blockResponse = await fetch(blockUrl);
    const blockData = await blockResponse.json();
    const currentBlock = parseInt(blockData.result, 16);

    const confirmations = currentBlock - blockNumber;

    if (confirmations < MINIMUM_CONFIRMATIONS) {
      return {
        valid: false,
        error: `Insufficient confirmations: ${confirmations}/${MINIMUM_CONFIRMATIONS}. Please wait.`
      };
    }

    // Check 5: Amount verification
    const valueWei = BigInt(tx.value);
    const valueEth = parseFloat(formatUnits(valueWei, 18));
    const paidUSD = valueEth * currentEthPriceUSD;

    const minAcceptable = expectedAmountUSD * (1 - PRICE_TOLERANCE);
    const maxAcceptable = expectedAmountUSD * (1 + PRICE_TOLERANCE);

    if (paidUSD < minAcceptable) {
      return {
        valid: false,
        error: `Insufficient payment: $${paidUSD.toFixed(2)} sent, $${expectedAmountUSD} required`
      };
    }

    if (paidUSD > maxAcceptable) {
      // Overpayment is OK, but warn
      console.warn(`Overpayment detected: $${paidUSD.toFixed(2)} sent, $${expectedAmountUSD} required`);
    }

    return {
      valid: true,
      details: {
        from: tx.from,
        to: tx.to,
        value: valueEth.toString(),
        blockNumber,
        confirmations,
      },
    };
  } catch (error: any) {
    console.error('ETH verification error:', error);
    return { valid: false, error: error.message || 'Verification failed' };
  }
}

/**
 * Verify USDC payment transaction on-chain
 */
export async function verifyUsdcPayment(
  txHash: string,
  expectedAmountUSD: number
): Promise<VerificationResult> {
  if (!ETHERSCAN_API_KEY) {
    return { valid: false, error: 'Etherscan API not configured' };
  }

  if (!TREASURY_ADDRESS || TREASURY_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return { valid: false, error: 'Treasury wallet not configured' };
  }

  try {
    // Fetch transaction receipt
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${ETHERSCAN_API_KEY}`;
    const response = await fetch(url);
    const data: EtherscanResponse = await response.json();

    if (data.status === '0' || !data.result) {
      return { valid: false, error: 'Transaction not found on Ethereum mainnet' };
    }

    const receipt = data.result;

    // Check 1: Transaction succeeded
    if (receipt.status !== '0x1') {
      return { valid: false, error: 'Transaction failed on-chain' };
    }

    // Check 2: Get transaction details
    const txUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${ETHERSCAN_API_KEY}`;
    const txResponse = await fetch(txUrl);
    const txData = await txResponse.json();

    if (!txData.result) {
      return { valid: false, error: 'Could not fetch transaction details' };
    }

    const tx = txData.result;

    // USDC contract address on mainnet
    const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'.toLowerCase();

    // Check 3: Transaction is to USDC contract
    if (tx.to?.toLowerCase() !== USDC_ADDRESS) {
      return {
        valid: false,
        error: 'Transaction is not a USDC transfer'
      };
    }

    // Check 4: Decode transfer data
    // USDC transfer: 0xa9059cbb (transfer function signature) + address (32 bytes) + amount (32 bytes)
    const input = tx.input;

    if (!input.startsWith('0xa9059cbb')) {
      return { valid: false, error: 'Not a USDC transfer transaction' };
    }

    // Extract recipient (bytes 4-36, skip function selector)
    const recipientHex = '0x' + input.slice(34, 74);
    const recipient = '0x' + recipientHex.slice(26); // Remove padding

    if (recipient.toLowerCase() !== TREASURY_ADDRESS) {
      return {
        valid: false,
        error: `USDC sent to wrong address. Expected ${TREASURY_ADDRESS}, got ${recipient}`
      };
    }

    // Extract amount (bytes 36-68)
    const amountHex = '0x' + input.slice(74, 138);
    const amountWei = BigInt(amountHex);
    const amountUsdc = parseFloat(formatUnits(amountWei, 6)); // USDC has 6 decimals

    // Check 5: Amount verification
    const minAcceptable = expectedAmountUSD * (1 - PRICE_TOLERANCE);
    const maxAcceptable = expectedAmountUSD * (1 + PRICE_TOLERANCE);

    if (amountUsdc < minAcceptable) {
      return {
        valid: false,
        error: `Insufficient payment: $${amountUsdc.toFixed(2)} USDC sent, $${expectedAmountUSD} required`
      };
    }

    // Check 6: Confirmations
    const blockNumber = parseInt(receipt.blockNumber, 16);
    const blockUrl = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${ETHERSCAN_API_KEY}`;
    const blockResponse = await fetch(blockUrl);
    const blockData = await blockResponse.json();
    const currentBlock = parseInt(blockData.result, 16);
    const confirmations = currentBlock - blockNumber;

    if (confirmations < MINIMUM_CONFIRMATIONS) {
      return {
        valid: false,
        error: `Insufficient confirmations: ${confirmations}/${MINIMUM_CONFIRMATIONS}. Please wait.`
      };
    }

    return {
      valid: true,
      details: {
        from: tx.from,
        to: recipient,
        value: amountUsdc.toString(),
        blockNumber,
        confirmations,
      },
    };
  } catch (error: any) {
    console.error('USDC verification error:', error);
    return { valid: false, error: error.message || 'Verification failed' };
  }
}

/**
 * Get current ETH price from CoinGecko (server-side verification)
 */
export async function getCurrentEthPrice(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      { next: { revalidate: 60 } }
    );
    const data = await response.json();
    return data.ethereum?.usd || 2000; // Fallback to $2000 if API fails
  } catch (error) {
    console.error('Failed to fetch ETH price:', error);
    return 2000; // Conservative fallback
  }
}
