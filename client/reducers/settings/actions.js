import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import set from 'lodash/set';
import { emptyObj, LIST } from 'defaults';
import { getInitialState } from './state';

export const SET_SETTINGS = 'SETTINGS_SET';

const reducer = {};

export function setSettings(settings = emptyObj) {
  return {
    type: SET_SETTINGS,
    settings,
  };
}

reducer[SET_SETTINGS] = (state, { settings }) => {
  const { _id } = settings || emptyObj;

  if (!_id) {
    return state;
  }

  set(state, [LIST, _id], settings);

  return state;
};

export function settingsReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
