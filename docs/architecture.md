# CoinRoll Architecture

## System Overview

CoinRoll is a decentralized payroll system built on Solana that leverages zero-knowledge proofs for invoice verification and privacy. The system consists of four main components:

1. Frontend (Next.js)
2. Backend (NestJS)
3. Zero-Knowledge Circuit (Circom)
4. Solana Program (Anchor)

## Component Details

### Frontend (Next.js)

The frontend is built with Next.js and provides the following features:
- Phantom wallet integration for Web3 authentication
- Invoice creation and management interface
- QR code generation for payment requests
- Real-time invoice status updates
- Integration with Streamflow for recurring payments
- Mercuryo integration for fiat on/off-ramping

### Backend (NestJS)

The backend handles:
- Invoice storage and retrieval
- Integration with Streamflow SDK
- Mercuryo API integration
- zk-proof generation and verification
- MongoDB database management

### Zero-Knowledge Circuit (Circom)

The zk-circuit provides:
- Invoice verification using Merkle proofs
- Privacy-preserving payment validation
- Efficient batch processing of invoices

### Solana Program (Anchor)

The Solana program implements:
- Invoice state management
- Merkle root updates
- zk-proof verification
- Payment processing

## Data Flow

1. **Invoice Creation**
   - User creates invoice through frontend
   - Backend stores invoice in MongoDB
   - Invoice is added to Merkle tree
   - Merkle root is updated on-chain

2. **Payment Processing**
   - Recipient receives payment request
   - Payment is made through Solana
   - zk-proof is generated for verification
   - Invoice status is updated

3. **Verification**
   - zk-proof is verified on-chain
   - Invoice status is updated to "Verified"
   - Event is emitted for tracking

## Security Considerations

1. **Wallet Security**
   - Phantom wallet integration
   - Secure key management
   - Transaction signing

2. **Data Privacy**
   - Zero-knowledge proofs
   - Merkle tree for efficient verification
   - Private invoice details

3. **Smart Contract Security**
   - Access control
   - State validation
   - Event logging

## Future Enhancements

1. **Tax Reporting**
   - CSV export functionality
   - Fiat value conversion
   - Tax jurisdiction support

2. **Additional Features**
   - Multi-currency support
   - Automated payroll scheduling
   - Enhanced privacy features

## Development Guidelines

1. **Code Organization**
   - Modular architecture
   - Clear separation of concerns
   - Comprehensive documentation

2. **Testing**
   - Unit tests for all components
   - Integration tests
   - End-to-end testing

3. **Deployment**
   - CI/CD pipeline
   - Environment configuration
   - Monitoring and logging 