import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';

export const isProgrammableConfigV1 = (x) => x.__kind === 'V1';

/**
 * @category userTypes
 * @category generated
 */
export const programmableConfigBeet = beet.dataEnum([
  [
    'V1',
    new beet.FixableBeetArgsStruct(
      [['ruleSet', beet.coption(beetSolana.publicKey)]],
      'ProgrammableConfigRecord["V1"]',
    ),
  ],
]);
