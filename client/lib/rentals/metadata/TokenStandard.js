/* eslint-disable */
import * as beet from '@metaplex-foundation/beet';

/**
* @category enums
* @category generated
*/
export let TokenStandard;
(function (TokenStandard) {
  TokenStandard[(TokenStandard.NonFungible = 0)] = 'NonFungible';
  TokenStandard[(TokenStandard.FungibleAsset = 1)] = 'FungibleAsset';
  TokenStandard[(TokenStandard.Fungible = 2)] = 'Fungible';
  TokenStandard[(TokenStandard.NonFungibleEdition = 3)] =
    'NonFungibleEdition';
  TokenStandard[(TokenStandard.ProgrammableNonFungible = 4)] =
    'ProgrammableNonFungible';
  TokenStandard[(TokenStandard.ProgrammableNonFungibleEdition = 5)] =
    'ProgrammableNonFungibleEdition';
}(TokenStandard || (TokenStandard = {})));

/**
* @category userTypes
* @category generated
*/
export const tokenStandardBeet = beet.fixedScalarEnum(TokenStandard);
