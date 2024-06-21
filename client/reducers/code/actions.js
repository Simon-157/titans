import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, LIST } from 'defaults';
import { getInitialState } from './state';

export const SET_CODE = 'CODE_SET_CODE';
export const SET_CODES = 'CODE_SET_CODES';

const reducer = {};

export function setCode(code = emptyObj) {
  return {
    type: SET_CODE,
    code,
  };
}

reducer[SET_CODE] = (state, { code }) => {
  const { _id } = code || emptyObj;

  if (!_id) {
    return state;
  }

  each(code, (value, field) => {
    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setCodes(codes) {
  return {
    type: SET_CODES,
    codes,
  };
}

reducer[SET_CODES] = (state, { codes }) => {
  return reduce(codes, (reducedState, code) => {
    return reducer[SET_CODE](reducedState, { code });
  }, state);
};

export function codeReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
