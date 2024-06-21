import { Keypair } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { emptyWallet } from '../common';
import { useEnvironmentCtx } from '../providers/EnvironmentProvider';
import { nftRentalsProgram } from '../sdk';

export function useAllRentals() {
  const { connection } = useEnvironmentCtx();

  return useQuery(['useAllRentals'], async () => {
    const rentals = await nftRentalsProgram(
      connection,
      emptyWallet(Keypair.generate().publicKey),
    ).account.rental.all();

    return rentals.map((e) => {
      return { pubkey: e.publicKey, parsed: e.account };
    });
  });
}
