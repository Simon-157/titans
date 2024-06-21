import dayjs from 'dayjs';
import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, CREATED_AT, END_AT, LIST, START_AT } from 'defaults';
import { getInitialState } from './state';

export const SET_EVENT = 'EVENT_SET_EVENT';
export const SET_EVENTS = 'EVENT_SET_EVENTS';

const reducer = {};

export function setEvent(event = emptyObj) {
  return {
    type: SET_EVENT,
    event,
  };
}

const dateFields = [CREATED_AT, END_AT, START_AT];

reducer[SET_EVENT] = (state, { event }) => {
  const { _id } = event || emptyObj;

  if (!_id) {
    return state;
  }

  each(event, (value, field) => {
    if (dateFields.indexOf(field) !== -1) {
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

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    events,
  };
}

reducer[SET_EVENTS] = (state, { events }) => {
  return reduce(events, (reducedState, event) => {
    return reducer[SET_EVENT](reducedState, { event });
  }, state);
};

export function eventReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
