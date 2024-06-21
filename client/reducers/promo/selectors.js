import { createSelector } from 'reselect';
import get from 'lodash/get';
import { emptyObj, LIST, PROMO, getProps } from 'defaults';

export function getPromos(state = emptyObj) {
  return get(state, [PROMO, LIST], emptyObj);
}

export const getPromo = createSelector(
  getPromos,
  getProps,
  (promos, _id) => get(promos, [_id], emptyObj),
);
