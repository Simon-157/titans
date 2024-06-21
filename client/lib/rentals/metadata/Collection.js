import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';

/**
 * @category userTypes
 * @category generated
 */
export const collectionBeet = new beet.BeetArgsStruct(
  [
    ['verified', beet.bool],
    ['key', beetSolana.publicKey],
  ],
  'Collection',
);
