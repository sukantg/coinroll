import { WalletContextProvider } from '../contexts/WalletContext';
import './globals.css';

export const metadata = {
  title: 'CoinRoll',
  description: 'Decentralized payroll system built on Solana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-white min-h-screen">
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
} 