import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, LIST } from 'defaults';
import { getInitialState } from './state';

export const DELETE_PROMO = 'PROMO_DELETE_PROMO';
export const SET_PROMO = 'PROMO_SET_PROMO';
export const SET_PROMOS = 'PROMO_SET_PROMOS';

const reducer = {};

reducer[DELETE_PROMO] = (state, { id } = emptyObj) => {
  // eslint-disable-next-line no-param-reassign
  delete state.list[id];

  return state;
};

export function setPromo(promo = emptyObj) {
  return {
    type: SET_PROMO,
    promo,
  };
}

reducer[SET_PROMO] = (state, { promo }) => {
  const { _id, remove } = promo || emptyObj;

  if (remove) {
    return reducer[DELETE_PROMO](state, { id: remove });
  }

  if (!_id) {
    return state;
  }

  each(promo, (value, field) => {
    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setPromos(promos) {
  return {
    type: SET_PROMOS,
    promos,
  };
}

reducer[SET_PROMOS] = (state, { promos }) => {
  return reduce(promos, (reducedState, promo) => {
    return reducer[SET_PROMO](reducedState, { promo });
  }, state);
};

export function promoReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
