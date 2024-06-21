import { createSelector } from 'reselect';
import find from 'lodash/find';
import get from 'lodash/get';
import {
  emptyObj,
  BAR,
  LIST,
  getProps,
} from 'defaults';

export function getBars(state = emptyObj) {
  return get(state, [BAR, LIST], emptyObj);
}

export const getBar = createSelector(
  getBars,
  getProps,
  (bars, id) => get(bars, [id], emptyObj),
);

export const getBarByShortUrl = createSelector(
  getBars,
  getProps,
  (bars, shortUrl) => find(bars, (bar) => bar.shortUrl === shortUrl) || emptyObj,
);
