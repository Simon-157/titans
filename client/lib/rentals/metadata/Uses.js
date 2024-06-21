import * as beet from '@metaplex-foundation/beet';
import { useMethodBeet } from './UseMethod';

/**
* @category userTypes
* @category generated
*/
export const usesBeet = new beet.BeetArgsStruct(
  [
    ['useMethod', useMethodBeet],
    ['remaining', beet.u64],
    ['total', beet.u64],
  ],
  'Uses',
);
