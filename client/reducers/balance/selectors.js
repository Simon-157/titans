import { createSelector } from 'reselect';
import find from 'lodash/find';
import get from 'lodash/get';
import {
  emptyObj,
  BALANCE,
  LIST,
  getProps,
} from 'defaults';

export function getBalances(state = emptyObj) {
  return get(state, [BALANCE, LIST], emptyObj);
}

export const getActiveBalance = createSelector(
  getBalances,
  (balances) => {
    let balance = find(balances, (b) => {
      return b.active;
    });

    if (!balance) {
      balance = find(balances);
    }

    return balance;
  },
);

export const getBalance = createSelector(
  getBalances,
  getProps,
  (balances, id) => get(balances, [id], emptyObj),
);
