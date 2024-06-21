import dayjs from 'dayjs';
import each from 'lodash/each';
import find from 'lodash/find';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import {
  emptyObj,
  ACTIVE,
  BALANCE,
  CHANGED,
  DATA,
  DATE_PUBLISHED,
  GET,
  LIST,
  SET,
} from 'defaults';
import { removeEmptyValues } from 'lib/object';
import { executePrimusRequest } from 'client/request';
import { requested } from 'client/request/requested';
import { getInitialState, serverValue } from './state';

export const EDIT_BALANCE = 'BALANCE_EDIT_BALANCE';
export const SET_BALANCE = 'BALANCE_SET_BALANCE';
export const SET_BALANCES = 'BALANCE_SET_BALANCES';

const reducer = {};
const updating = {};

export function requestBalanceVersions(callback) {
  executePrimusRequest('getVersions', BALANCE, null, callback);
}

export function requestBalance(version) {
  const key = version || BALANCE;

  if (!requested[key]) {
    executePrimusRequest(GET, BALANCE, version);

    requested[key] = true;
  }
}

export function saveBalance(balance = emptyObj, callback) {
  const { _id, data } = balance;

  if (!_id || updating[_id]) {
    return;
  }

  updating[_id] = true;

  executePrimusRequest(SET, BALANCE, {
    _id,
    data: removeEmptyValues(data),
  }, callback);
}

export function editBalance({ path, value, version } = emptyObj) {
  return {
    type: EDIT_BALANCE,
    path,
    value,
    version,
  };
}

reducer[EDIT_BALANCE] = (state, { path, value, version }) => {
  if (!version) {
    return state;
  }

  set(state, [LIST, version, DATA, ...path], value);
  set(state, [LIST, version, CHANGED], true);

  return state;
};

export function setBalance(balance = emptyObj, force) {
  return {
    type: SET_BALANCE,
    balance,
    force,
  };
}

reducer[SET_BALANCE] = (state, { balance, force }) => {
  const { _id, active } = balance || emptyObj;

  if (!_id) {
    return state;
  }

  if (updating[_id]) {
    set(state, [LIST, _id, CHANGED], false);

    delete updating[_id];
  } else if (!force && get(state, [LIST, _id, CHANGED])) {
    return state;
  }

  serverValue[_id] = balance;

  if (active) {
    const prevActive = find(state.list, (b) => {
      return b.active;
    });

    if (prevActive) {
      set(state, [LIST, prevActive._id, ACTIVE], false);
    }
  }

  each(balance, (value, field) => {
    if (field === DATE_PUBLISHED) {
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

export function setBalances(balances) {
  return {
    type: SET_BALANCES,
    balances,
  };
}

reducer[SET_BALANCES] = (state, { balances }) => {
  return reduce(balances, (reducedState, balance) => {
    return reducer[SET_BALANCE](reducedState, { balance });
  }, state);
};

export function balanceReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
