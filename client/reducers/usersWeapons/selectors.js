import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import get from 'lodash/get';
import {
  emptyObj,
  LIST,
  USERS_WEAPONS,
  getProps,
} from 'defaults';

function getWeapons(state = emptyObj) {
  return get(state, [USERS_WEAPONS, LIST], emptyObj);
}

export const getUserWeapons = createSelector(
  getWeapons,
  getProps,
  (weapons, userId) => {
    return filter(weapons, (w) => w.userId === userId);
  },
);
