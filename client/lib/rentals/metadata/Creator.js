import * as beetSolana from '@metaplex-foundation/beet-solana';
import * as beet from '@metaplex-foundation/beet';

/**
 * @category userTypes
 * @category generated
 */
export const creatorBeet = new beet.BeetArgsStruct(
  [
    ['address', beetSolana.publicKey],
    ['verified', beet.bool],
    ['share', beet.u8],
  ],
  'Creator',
);
