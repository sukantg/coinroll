# Coinroll

A decentralized crypto-native invoicing and payroll platform built on Solana, featuring zk compression and integrations with Streamflow and Mercuryo.

## Features

- Phantom wallet integration for Web3 authentication
- Invoice creation and management
- zk-Proof generation and verification
- Automated recurring payments via Streamflow
- Fiat on/off-ramping with Mercuryo
- Tax reporting and CSV exports


## 🛠️ Prerequisites

- Node.js >= 18
- Solana CLI tools
- Anchor Framework
- Rust toolchain
- MongoDB (local or Atlas)
- Phantom wallet

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start development servers:
   ```bash
   # Start frontend
   npm run dev:client

   # Start backend
   npm run dev:server
   ```

4. Deploy Solana program:
   ```bash
   cd solana-program
   anchor build
   anchor deploy
   ```

## Environment Variables

Create a `.env` file in each directory with the following variables:

### Client
```
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=<your_program_id>
```

### Server
```
MONGODB_URI=<your_mongodb_uri>
MERKURO_API_KEY=<your_mercuryo_key>
STREAMFLOW_API_KEY=<your_streamflow_key>
```

### Solana Program
```
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
ANCHOR_WALLET=<path_to_wallet>
