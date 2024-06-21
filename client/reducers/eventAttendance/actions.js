import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, LIST } from 'defaults';
import { getInitialState } from './state';

export const DELETE_EVENT_ATTENDANCE = 'EVENT_DELETE_ATTENDANCE';
export const SET_EVENT_ATTENDANCE = 'EVENT_SET_ATTENDANCE';
export const SET_EVENT_ATTENDANCES = 'EVENT_SET_ATTENDANCES';

const reducer = {};

reducer[DELETE_EVENT_ATTENDANCE] = (state, { id } = emptyObj) => {
  // eslint-disable-next-line no-param-reassign
  delete state.list[id];

  return state;
};

export function setEventAttendance(attendance = emptyObj) {
  return {
    type: SET_EVENT_ATTENDANCE,
    attendance,
  };
}

reducer[SET_EVENT_ATTENDANCE] = (state, { attendance }) => {
  const { _id, remove } = attendance || emptyObj;

  if (remove) {
    return reducer[DELETE_EVENT_ATTENDANCE](state, { id: remove });
  }

  if (!_id) {
    return state;
  }

  each(attendance, (value, field) => {
    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setEventAttendances(attendances) {
  return {
    type: SET_EVENT_ATTENDANCES,
    attendances,
  };
}

reducer[SET_EVENT_ATTENDANCES] = (state, { attendances }) => {
  return reduce(attendances, (reducedState, attendance) => {
    return reducer[SET_EVENT_ATTENDANCE](reducedState, { attendance });
  }, state);
};

export function eventAttendanceReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
