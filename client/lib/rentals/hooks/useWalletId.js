import { useWallet } from '@solana/wallet-adapter-react';
import { tryPublicKey } from '../common';
import { useQuery } from './useQuery';

export function useWalletId() {
  const wallet = useWallet();

  const query = useQuery();

  return tryPublicKey(query.get('wallet')) || wallet.publicKey;
}
