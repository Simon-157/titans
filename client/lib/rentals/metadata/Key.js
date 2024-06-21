/* eslint-disable */
import * as beet from '@metaplex-foundation/beet';

/**
* @category enums
* @category generated
*/
export let Key;
(function (Key) {
  Key[(Key.Uninitialized = 0)] = 'Uninitialized';
  Key[(Key.EditionV1 = 1)] = 'EditionV1';
  Key[(Key.MasterEditionV1 = 2)] = 'MasterEditionV1';
  Key[(Key.ReservationListV1 = 3)] = 'ReservationListV1';
  Key[(Key.MetadataV1 = 4)] = 'MetadataV1';
  Key[(Key.ReservationListV2 = 5)] = 'ReservationListV2';
  Key[(Key.MasterEditionV2 = 6)] = 'MasterEditionV2';
  Key[(Key.EditionMarker = 7)] = 'EditionMarker';
  Key[(Key.UseAuthorityRecord = 8)] = 'UseAuthorityRecord';
  Key[(Key.CollectionAuthorityRecord = 9)] = 'CollectionAuthorityRecord';
  Key[(Key.TokenOwnedEscrow = 10)] = 'TokenOwnedEscrow';
  Key[(Key.TokenRecord = 11)] = 'TokenRecord';
  Key[(Key.MetadataDelegate = 12)] = 'MetadataDelegate';
  Key[(Key.EditionMarkerV2 = 13)] = 'EditionMarkerV2';
}(Key || (Key = {})));

/**
 * @category userTypes
 * @category generated
 */
export const keyBeet = beet.fixedScalarEnum(Key);
