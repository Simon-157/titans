/* eslint-disable */
import * as beet from '@metaplex-foundation/beet';

/**
* @category enums
* @category generated
*/
export let UseMethod;
(function (UseMethod) {
  UseMethod[(UseMethod.Burn = 0)] = 'Burn';
  UseMethod[(UseMethod.Multiple = 1)] = 'Multiple';
  UseMethod[(UseMethod.Single = 2)] = 'Single';
}(UseMethod || (UseMethod = {})));

/**
* @category userTypes
* @category generated
*/
export const useMethodBeet = beet.fixedScalarEnum(UseMethod);
