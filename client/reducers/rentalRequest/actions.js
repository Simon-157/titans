import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, LIST, REQUESTED_AT } from 'defaults';
import { getInitialState } from './state';

export const SET_RENTAL_REQUEST = 'RENTAL_REQUEST_SET_ITEM';
export const SET_RENTAL_REQUESTS = 'RENTAL_REQUEST_SET_ITEMS';

const reducer = {};

export function setRentalRequest(rentalRequest = emptyObj) {
  return {
    type: SET_RENTAL_REQUEST,
    rentalRequest,
  };
}

reducer[SET_RENTAL_REQUEST] = (state, { rentalRequest }) => {
  const { _id } = rentalRequest || emptyObj;

  if (!_id) {
    return state;
  }

  each(rentalRequest, (value, field) => {
    if (field === REQUESTED_AT && value) {
      // eslint-disable-next-line no-param-reassign
      value = new Date(value);
    }

    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setRentalRequests(rentalRequests) {
  return {
    type: SET_RENTAL_REQUESTS,
    rentalRequests,
  };
}

reducer[SET_RENTAL_REQUESTS] = (state, { rentalRequests }) => {
  return reduce(rentalRequests, (reducedState, rentalRequest) => {
    return reducer[SET_RENTAL_REQUEST](reducedState, { rentalRequest });
  }, {});
};

export function rentalRequestReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
