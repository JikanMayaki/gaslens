# GasLens

See through the fees. Choose the cheapest path.

GasLens is a gas fee comparison and optimization tool for DeFi transactions. Compare transaction costs across major protocols like Uniswap, SushiSwap, and Curve to find the most cost-effective route for your swaps.

## Features

- **Fee Comparison**: Compare gas fees and protocol fees across multiple DeFi protocols
- **Real-time Data**: Live gas prices and fee estimates updated every block
- **Protocol Directory**: Browse and explore audited DeFi protocols
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 16.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom component library with Lucide icons
- **Data Visualization**: Recharts (ready for charts)
- **Validation**: Zod schemas
- **Date Handling**: date-fns

## Project Structure

```
gaslens/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Input.tsx
│   │   │       └── layout/
│   │   │           ├── Header.tsx
│   │   │           └── Footer.tsx
│   │   ├── lib/
│   │   │   └── constants/
│   │   │       ├── chains.ts       # Blockchain configurations
│   │   │       ├── protocols.ts    # Protocol definitions
│   │   │       ├── tokens.ts       # Token configurations
│   │   │       └── api/
│   │   │           └── utils/
│   │   │               ├── calculations.ts  # Fee calculations
│   │   │               ├── formatting.ts    # Number/currency formatting
│   │   │               └── validation.ts    # Input validation
│   │   ├── compare/
│   │   │   └── page.tsx    # Fee comparison page
│   │   ├── directory/
│   │   │   └── page.tsx    # Protocol directory
│   │   ├── layout.tsx      # Root layout with Header/Footer
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   └── types/
│       ├── api.ts          # API response types
│       ├── fee.ts          # Fee-related types
│       ├── protocol.ts     # Protocol types
│       └── transaction.ts  # Transaction types
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gaslens.git
cd gaslens
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# API Keys (optional for development)
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key
NEXT_PUBLIC_1INCH_API_KEY=your_1inch_api_key
NEXT_PUBLIC_0X_API_KEY=your_0x_api_key
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=GasLens

# Feature Flags
NEXT_PUBLIC_ENABLE_ALERTS=false
NEXT_PUBLIC_ENABLE_HISTORICAL_DATA=false
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Available Routes

- `/` - Homepage with features overview
- `/compare` - Compare gas fees across protocols
- `/directory` - Browse supported DeFi protocols

## Components

### UI Components

All components support both light and dark modes:

- **Button**: Primary, secondary, outline, and ghost variants
- **Card**: Flexible container with padding options and hover effects
- **Input**: Form input with label, error states, and helper text

### Layout Components

- **Header**: Navigation with protocol links
- **Footer**: Site footer with links and social media

## Utilities

### Calculations (`lib/constants/api/utils/calculations.ts`)

- `calculateGasCost`: Convert gas to USD
- `calculateTotalFee`: Gas + protocol fees
- `calculateSavings`: Compare fee differences
- `calculatePriceImpact`: Slippage calculations
- `calculateAPY`: Yield calculations

### Formatting (`lib/constants/api/utils/formatting.ts`)

- `formatCurrency`: USD formatting
- `formatNumber`: Decimal formatting
- `formatGwei`: Gas price formatting
- `formatPercentage`: Percentage display
- `formatTimeAgo`: Relative time

### Validation (`lib/constants/api/utils/validation.ts`)

- Ethereum address validation
- Transaction hash validation
- Amount and slippage validation
- Zod schemas for API data

## Development

### Adding a New Protocol

1. Add protocol definition to `src/app/lib/constants/protocols.ts`
2. Update the protocol type if needed
3. Add protocol logo to `/public`

### Adding a New Token

1. Add token definition to `src/app/lib/constants/tokens.ts`
2. Include contract address, decimals, and metadata

## Future Enhancements

- [ ] Real-time gas price fetching
- [ ] Live protocol fee data via APIs
- [ ] Transaction simulation
- [ ] Historical fee analysis
- [ ] Fee alerts and notifications
- [ ] Multi-chain support (Polygon, Arbitrum, Optimism)
- [ ] Wallet integration
- [ ] Save favorite routes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

---

Built with Next.js and Tailwind CSS
