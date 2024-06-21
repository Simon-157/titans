import { createSelector } from 'reselect';
import find from 'lodash/find';
import get from 'lodash/get';
import {
  emptyObj,
  LIST,
  SETTINGS,
  getProps,
} from 'defaults';

function getSettings(state = emptyObj) {
  return get(state, [SETTINGS, LIST], emptyObj);
}

export const getUserSettings = createSelector(
  getSettings,
  getProps,
  (settings, userId) => {
    return find(settings, (s) => s.userId === userId);
  },
);
