import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import { emptyArr, emptyObj, PARSED } from 'defaults';
import { fetchIdlAccountDataById, findMintMetadataId } from '../common';
import { Metadata } from '../metadata';
import { useEnvironmentCtx } from '../providers/EnvironmentProvider';
import { useAllRentals } from './useAllRentals';
import { useTokenAccounts } from './useTokenAccounts';

const ALLOWED_CREATORS = ['F1XeEHfaj1NcXMbVgtsSLjSA4WkjaMWafqMz9ecj6ACa'];

export function allowedTokens(tokenDatas, cluster) {
  return tokenDatas.filter((token) => {
    if (token.tokenAccount?.parsed.state === 'frozen') {
      return false;
    }

    if (cluster === 'devnet') {
      return true;
    }

    return token.metaplexData?.parsed.data.creators?.some(
      (c) => ALLOWED_CREATORS.includes(c.address.toString()) && c.verified,
    );
  });
}

export function useMyCharacters(wallet = emptyArr) {
  const { connection, environment } = useEnvironmentCtx();

  const allRentals = useAllRentals();
  const allTokenAccounts = useTokenAccounts(wallet);

  return useQuery(
    [
      'useAllowedTokenDatas',
      allTokenAccounts.data?.map((tk) => JSON.stringify(tk)).join(','),
    ],
    async () => {
      const tokenAccounts = allTokenAccounts.data ?? [];

      const rentals = keyBy(allRentals.data, (r) => {
        const { mint } = r.parsed;

        return mint;
      });

      const accountDataById = await fetchIdlAccountDataById(connection, [
        ...tokenAccounts.map((tokenAccount) => {
          return findMintMetadataId(new PublicKey(tokenAccount.parsed.mint));
        }),
      ]);

      const metaplexData = tokenAccounts.reduce((acc, tka, i) => {
        const metadataId = findMintMetadataId(new PublicKey(tka.parsed.mint));

        const metadataInfo = accountDataById[metadataId.toString()];

        const { maker, taker } = get(rentals, [tka.parsed.mint, PARSED], emptyObj);

        if (metadataInfo) {
          try {
            acc[tokenAccounts[i].pubkey.toString()] = {
              ...metadataInfo.data,
              maker: maker?.toString(),
              owner: maker?.toString(),
              pubkey: metadataId,
              parsed: Metadata.deserialize(metadataInfo.data)[0],
              taker: taker?.toString(),
            };
          } catch (err) {
            //
          }
        }
        return acc;
      }, {});
      const tokenDatas = tokenAccounts.map((tokenAccount) => ({
        tokenAccount,
        metaplexData: metaplexData[tokenAccount.pubkey.toString()],
      }));

      return allowedTokens(tokenDatas, environment.label);
    },
    {
      enabled: allTokenAccounts.isFetched,
    },
  );
}
