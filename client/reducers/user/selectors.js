import { createSelector } from 'reselect';
import get from 'lodash/get';
import {
  emptyObj,
  JWT,
  LIST,
  USER,
  getProps,
} from 'defaults';

export function getCurrentUser(state = emptyObj) {
  return get(state, [USER, USER], null);
}

export const getCurrentUserJWT = createSelector(
  getCurrentUser, (user) => get(user, [JWT], null),
);

export function getUsers(state = emptyObj) {
  return get(state, [USER, LIST], emptyObj);
}

export const getUser = createSelector(
  getUsers,
  getProps,
  (users, id) => get(users, [id], emptyObj),
);
