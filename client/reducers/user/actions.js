import dayjs from 'dayjs';
import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import {
  emptyObj,
  ACTIVE_CHARACTER_ID,
  COUNT,
  CREATED_AT,
  IDENTIFIER,
  JWT,
  LIST,
  USER,
  USERNAME,
  WALLET,
} from 'defaults';
import { deleteCookie, setCookie } from 'client/lib/cookie';
import { closePrimus, setSocket } from 'client/request';
import { getInitialState } from './state';

export const SET_CURRENT_USER = 'USER_SET_CURRENT';
export const SET_CURRENT_WALLET = 'USER_SET_WALLET';
export const SET_USER = 'USER_SET_USER';
export const SET_USERS = 'USER_SET_USERS';

const reducer = {};

export function setCurrentUser(user) {
  const { id } = user || emptyObj;

  if (id) {
    const { jwt } = user;

    if (jwt) {
      localStorage.setItem(JWT, jwt);
      setCookie(JWT, jwt);
      closePrimus();
      setSocket(jwt);
      delete user.jwt; // eslint-disable-line no-param-reassign
    }
  } else {
    localStorage.removeItem(ACTIVE_CHARACTER_ID);
    localStorage.removeItem(JWT);
    deleteCookie(JWT);
    closePrimus();
  }

  return {
    type: SET_CURRENT_USER,
    user,
  };
}

reducer[SET_CURRENT_USER] = (state, { user }) => {
  const { id, _id = id } = user || emptyObj;

  if (_id) {
    each(user, (value, field) => {
      set(state, [USER, field], value);
    });
  } else {
    set(state, [USER], null);
  }

  return state;
};

export function setCurrentWallet(user) {
  return {
    type: SET_CURRENT_WALLET,
    user,
  };
}

reducer[SET_CURRENT_WALLET] = (state, { user }) => {
  const { wallet } = user || emptyObj;

  set(state, [USER, WALLET], wallet);

  return state;
};

export function setUser(user = emptyObj) {
  return {
    type: SET_USER,
    user,
  };
}

reducer[SET_USER] = (state, { user }) => {
  const { id, _id = id } = user || emptyObj;

  if (!_id) {
    return state;
  }

  if (_id === COUNT) {
    set(state, [COUNT], user.count);
  } else {
    each(user, (value, field) => {
      if (field === JWT) {
        return;
      }

      if (field === USERNAME) {
        set(state, [LIST, _id, IDENTIFIER], value);
      }

      if ([CREATED_AT].indexOf(field) !== -1) {
        let date = value;
        if (value) {
          date = dayjs(value);
        }

        set(state, [LIST, _id, field], date);

        return;
      }

      set(state, [LIST, _id, field], value);
    });
  }

  return state;
};

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

reducer[SET_USERS] = (state, { users }) => {
  return reduce(users, (reducedState, user) => {
    return reducer[SET_USER](reducedState, { user });
  }, state);
};

export function userReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
