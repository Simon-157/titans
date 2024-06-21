import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import {
  emptyObj,
  LIST,
  RENTAL_REQUEST,
  getProps,
} from 'defaults';

function getRentalRequests(state = emptyObj) {
  return get(state, [RENTAL_REQUEST, LIST], emptyObj);
}

export const getIncomingRequests = createSelector(
  getRentalRequests,
  getProps,
  (requests, userId) => {
    return filter(requests, (r) => r.owner === userId);
  },
);

export const getRequestByCharacterAndTakerId = createSelector(
  getRentalRequests,
  getProps,
  (requests, { characterId, taker }) => {
    return find(
      requests,
      (r) => r.characterId === characterId && r.taker === taker && !r.declined && !r.accepted,
    );
  },
);

export const getOutgoingRequests = createSelector(
  getRentalRequests,
  getProps,
  (requests, userId) => {
    return filter(requests, (r) => r.taker === userId);
  },
);
