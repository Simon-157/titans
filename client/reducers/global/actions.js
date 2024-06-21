import dayjs from 'dayjs';
import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import set from 'lodash/set';
import {
  emptyObj,
  _ID,
  ALERTS,
  EN,
  ERR,
  LANG,
  RENTED_UNTIL,
  SUCCESS,
  langs,
} from 'defaults';
import { setLang as i18nSetLang, t } from 'lib/i18n';
import { handleError } from 'lib/error';
import { getInitialState } from './state';

export const ADD_ERROR = 'GLOBAL_ADD_ERROR';
export const ADD_SUCCESS = 'GLOBAL_ADD_SUCCESS';
export const SET_GLOBAL = 'GLOBAL_SET_GLOBAL';
export const SET_LANG = 'GLOBAL_SET_LANG';

const reducer = {};

export function setGlobal(global = emptyObj) {
  return {
    type: SET_GLOBAL,
    global,
  };
}

reducer[SET_GLOBAL] = (state, { global }) => {
  const { _id } = global || emptyObj;

  if (!_id) {
    return state;
  }

  each(global, (value, field) => {
    if (field === _ID) {
      return;
    }

    if (field === RENTED_UNTIL) {
      let date = value;
      if (value) {
        date = dayjs(value);
      }

      set(state, [field], date);

      return;
    }

    set(state, [field], value);
  });

  return state;
};

export function addError(err) {
  return {
    type: ADD_ERROR,
    err,
  };
}

reducer[ADD_ERROR] = (state, { err }) => {
  if (!err) {
    return state;
  }

  const { alerts } = state;

  alerts.push({ message: handleError(err), type: ERR });

  set(state, [ALERTS], alerts);

  return state;
};

export function addSuccess(message = [SUCCESS]) {
  return {
    type: ADD_SUCCESS,
    message: t(message),
  };
}

reducer[ADD_SUCCESS] = (state, { message }) => {
  const { alerts } = state;

  alerts.push({ message, type: SUCCESS });

  set(state, [ALERTS], alerts);

  return state;
};

export function setLang(lang = EN) {
  i18nSetLang(lang);

  return {
    type: SET_LANG,
    lang,
  };
}

reducer[SET_LANG] = (state, { lang }) => {
  if (langs.indexOf(lang) === -1) {
    return state;
  }

  set(state, [LANG], lang);

  return state;
};

export function globalReducer(state = getInitialState(), action = {}) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
