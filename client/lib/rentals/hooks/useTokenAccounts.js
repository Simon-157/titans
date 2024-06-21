import { useQuery } from '@tanstack/react-query';
import { PublicKey } from '@solana/web3.js';
import { emptyArr } from 'defaults';
import { TOKEN_PROGRAM_ID } from '../common';
import { useEnvironmentCtx } from '../providers/EnvironmentProvider';
import { useWalletId } from './useWalletId';

export async function getTokenAccounts(connection, walletId) {
  const allTokenAccounts = await connection.getParsedTokenAccountsByOwner(
    walletId,
    {
      programId: TOKEN_PROGRAM_ID,
    },
  );

  const tokenAccounts = allTokenAccounts.value
    .filter(
      (tokenAccount) => tokenAccount.account.data.parsed.info.tokenAmount.uiAmount > 0,
    )
    .sort((a, b) => a.pubkey.toBase58().localeCompare(b.pubkey.toBase58()))
    .map((e) => ({
      pubkey: e.pubkey,
      parsed: e.account.data.parsed.info,
    }));
  return tokenAccounts;
}

export function useTokenAccounts(wallet = emptyArr) {
  let walletId = wallet[0];

  if (!walletId) {
    walletId = useWalletId();
  } else {
    walletId = new PublicKey(walletId);
  }

  const { connection } = useEnvironmentCtx();

  return useQuery(
    ['useTokenAccounts', walletId?.toString()],
    async () => {
      if (!walletId) {
        return emptyArr;
      }

      return getTokenAccounts(connection, walletId);
    },
    {
      enabled: Boolean(walletId),
    },
  );
}
