import { AnchorProvider, Program, utils } from '@coral-xyz/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { emptyWallet } from '../common';
import { IDL } from './idl/solana_nft_rentals';

export const MINT_GENERATOR_IDL = IDL;

export const MINT_GENERATOR_PROGRAM_ID = new PublicKey(
  'ctr1CJWm7rkfUwnLzDY8P1uSKtfQNpLYi7NUJSCheyN',
);

export const RENTAL_SEED = 'rental';

export function nftRentalsProgram(connection, wallet, options) {
  return new Program(
    MINT_GENERATOR_IDL,
    options?.programId ?? MINT_GENERATOR_PROGRAM_ID,
    new AnchorProvider(
      connection,
      wallet ?? emptyWallet(Keypair.generate().publicKey),
      options?.confirmOptions ?? {},
    ),
  );
}

export function findRentalId(mintId, programId = MINT_GENERATOR_PROGRAM_ID) {
  return PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode(RENTAL_SEED), mintId.toBuffer()],
    programId,
  )[0];
}
