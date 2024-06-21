import * as beet from '@metaplex-foundation/beet';
import { creatorBeet } from './Creator';

/**
 * @category userTypes
 * @category generated
 */
export const dataBeet = new beet.FixableBeetArgsStruct(
  [
    ['name', beet.utf8String],
    ['symbol', beet.utf8String],
    ['uri', beet.utf8String],
    ['sellerFeeBasisPoints', beet.u16],
    ['creators', beet.coption(beet.array(creatorBeet))],
  ],
  'Data',
);
