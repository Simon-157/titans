import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { CoinbaseWalletAdapter } from '@solana/wallet-adapter-coinbase';
import { HuobiWalletAdapter } from '@solana/wallet-adapter-huobi';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import AppComp from './app/index';

const endpoint = clusterApiUrl(WalletAdapterNetwork.Mainnet);

const wallets = [
  new CoinbaseWalletAdapter(),
  new HuobiWalletAdapter(),
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

function AppWithWallets() {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
            <AppComp />
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default AppWithWallets;
