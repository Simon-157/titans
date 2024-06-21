import { useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  executeTransaction,
  findMintMetadataId,
  getAssociatedTokenAddressSync,
} from '../common';
import { useEnvironmentCtx } from '../providers/EnvironmentProvider';
import { findRentalId, nftRentalsProgram } from '../sdk';

export function asWallet(wallet) {
  return {
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions,
    publicKey: wallet.publicKey,
  };
}

export function useHandleCreateRental() {
  const { connection } = useEnvironmentCtx();
  const wallet = asWallet(useWallet());
  const queryClient = useQueryClient();

  return useMutation(
    ['useHandleCreateRental'],
    async ({
      tokenData,
      extensionPaymentMint,
      extensionPaymentAmount,
      extensionDurationSeconds,
      maxExpiration,
    }) => {
      const tx = new Transaction();
      const mintId = new PublicKey(tokenData.tokenAccount.parsed.mint);
      const rentalId = findRentalId(mintId);
      const ix = await nftRentalsProgram(connection, wallet)
        .methods.createRental({
          mint: mintId,
          extensionPaymentMint,
          extensionPaymentAmount,
          extensionDurationSeconds,
          maxExpiration,
        })
        .accountsStrict({
          rental: rentalId,
          makerTokenAccount: tokenData.tokenAccount.pubkey,
          mint: mintId,
          mintMetadata: findMintMetadataId(mintId),
          rentalTokenAccount: getAssociatedTokenAddressSync(
            mintId,
            rentalId,
            true,
          ),
          maker: wallet.publicKey,
          payer: wallet.publicKey,
          metadataProgram: METADATA_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
      tx.add(ix);
      return executeTransaction(connection, tx, wallet);
    },
    {
      onError: (e) => {
        console.log('Failed to list rental'); // eslint-disable-line
        console.log(e); // eslint-disable-line
      },
      onSuccess: (txid) => {
        console.log('Successfully created listing'); // eslint-disable-line
        console.log(txid); // eslint-disable-line

        queryClient.resetQueries();
      },
    },
  );
}
