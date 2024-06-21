import { createSelector } from 'reselect';
import find from 'lodash/find';
import get from 'lodash/get';
import {
  emptyObj,
  LIST,
  LOOTBOX,
  getProps,
} from 'defaults';

export function getLootboxes(state = emptyObj) {
  return get(state, [LOOTBOX, LIST], emptyObj);
}

export const getUserLootbox = createSelector(
  getLootboxes,
  getProps,
  (lootboxes, userId) => {
    return find(lootboxes, (l) => l.userId === userId);
  },
);
