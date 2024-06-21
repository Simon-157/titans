import { createSelector } from 'reselect';
import find from 'lodash/find';
import get from 'lodash/get';
import {
  emptyObj,
  CODE,
  LIST,
  getProps,
} from 'defaults';

export function getCodes(state = emptyObj) {
  return get(state, [CODE, LIST], emptyObj);
}

export const getPromoCode = createSelector(
  getCodes,
  getProps,
  (codes, { promoId, userId } = emptyObj) => {
    return find(codes, (a) => a.promoId === promoId && a.userId === userId);
  },
);
