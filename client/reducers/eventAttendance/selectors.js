import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import get from 'lodash/get';
import {
  emptyObj,
  EVENT_ATTENDANCE,
  LIST,
  getProps,
} from 'defaults';

export function getAllEventAttendances(state = emptyObj) {
  return get(state, [EVENT_ATTENDANCE, LIST], emptyObj);
}

export const getEventAttendances = createSelector(
  getAllEventAttendances,
  getProps,
  (attendances, id) => filter(attendances, (a) => a.eventId === id),
);
