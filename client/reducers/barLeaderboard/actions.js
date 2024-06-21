import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, LIST } from 'defaults';
import { getInitialState } from './state';

export const SET_BAR_LEADERBOARD = 'BAR_SET_LEADERBOARD';
export const SET_BAR_LEADERBOARDS = 'BAR_SET_LEADERBOARDS';

const reducer = {};

export function setBarLeaderboard(record = emptyObj) {
  return {
    type: SET_BAR_LEADERBOARD,
    record,
  };
}

reducer[SET_BAR_LEADERBOARD] = (state, { record }) => {
  const { _id } = record || emptyObj;

  if (!_id) {
    return state;
  }

  each(record, (value, field) => {
    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setBarLeaderboards(records) {
  return {
    type: SET_BAR_LEADERBOARDS,
    records,
  };
}

reducer[SET_BAR_LEADERBOARDS] = (state, { records }) => {
  return reduce(records, (reducedState, record) => {
    return reducer[SET_BAR_LEADERBOARD](reducedState, { record });
  }, state);
};

export function barLeaderboardReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
