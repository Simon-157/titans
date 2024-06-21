import dayjs from 'dayjs';
import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, CREATED_AT, LIST } from 'defaults';
import { getInitialState } from './state';

export const SET_BAR = 'BAR_SET_BAR';
export const SET_BARS = 'BAR_SET_BARS';

const reducer = {};

export function setBar(bar = emptyObj) {
  return {
    type: SET_BAR,
    bar,
  };
}

reducer[SET_BAR] = (state, { bar }) => {
  const { _id } = bar || emptyObj;

  if (!_id) {
    return state;
  }

  each(bar, (value, field) => {
    if (field === CREATED_AT) {
      let date = value;
      if (value) {
        date = dayjs(value);
      }

      set(state, [LIST, _id, field], date);

      return;
    }

    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setBars(bars) {
  return {
    type: SET_BARS,
    bars,
  };
}

reducer[SET_BARS] = (state, { bars }) => {
  return reduce(bars, (reducedState, bar) => {
    return reducer[SET_BAR](reducedState, { bar });
  }, state);
};

export function barReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
