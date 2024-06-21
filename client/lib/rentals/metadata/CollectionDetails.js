import * as beet from '@metaplex-foundation/beet';

export const isCollectionDetailsV1 = (x) => x.__kind === 'V1';

/**
 * @category userTypes
 * @category generated
 */
export const collectionDetailsBeet = beet.dataEnum([
  [
    'V1',
    new beet.BeetArgsStruct(
      [['size', beet.u64]],
      'CollectionDetailsRecord["V1"]',
    ),
  ],
]);
