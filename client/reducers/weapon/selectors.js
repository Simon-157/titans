import get from 'lodash/get';
import {
  emptyObj,
  LIST,
  WEAPON,
} from 'defaults';

export function getWeapons(state = emptyObj) {
  return get(state, [WEAPON, LIST], emptyObj);
}
