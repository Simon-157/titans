import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, LIST } from 'defaults';
import { getInitialState } from './state';

export const SET_LOOTBOX = 'LOOTBOX_SET_LOOTBOX';
export const SET_LOOTBOXES = 'LOOTBOX_SET_LOOTBOXES';

const reducer = {};

export function setLootbox(lootbox = emptyObj) {
  return {
    type: SET_LOOTBOX,
    lootbox,
  };
}

reducer[SET_LOOTBOX] = (state, { lootbox }) => {
  const { _id } = lootbox || emptyObj;

  if (!_id) {
    return state;
  }

  each(lootbox, (value, field) => {
    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setLootboxes(lootboxes) {
  return {
    type: SET_LOOTBOXES,
    lootboxes,
  };
}

reducer[SET_LOOTBOXES] = (state, { lootboxes }) => {
  return reduce(lootboxes, (reducedState, lootbox) => {
    return reducer[SET_LOOTBOX](reducedState, { lootbox });
  }, state);
};

export function lootboxReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
