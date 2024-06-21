import { createSelector } from 'reselect';
import dayjs from 'dayjs';
import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import {
  emptyObj,
  EVENT,
  HOUR,
  LIST,
  getProps,
} from 'defaults';

export function getEvents(state = emptyObj) {
  return get(state, [EVENT, LIST], emptyObj);
}

export const getEvent = createSelector(
  getEvents,
  getProps,
  (events, id) => get(events, [id], emptyObj),
);

export const getUpcomingEvents = createSelector(
  getEvents,
  getProps,
  (events, { now = dayjs.utc().add(1, HOUR) } = emptyObj) => {
    return filter(events, (event) => {
      return now.isBefore(event.endAt);
    });
  },
);

export const getPastEvents = createSelector(
  getEvents,
  getProps,
  (events, { now = dayjs.utc().add(1, HOUR) } = emptyObj) => {
    return filter(events, (event) => {
      return now.isAfter(event.endAt);
    });
  },
);

export const getBarEvents = createSelector(
  getEvents,
  getProps,
  (events, { barId } = emptyObj) => filter(events, (event) => event.barId === barId),
);

export const getPastBarEvents = createSelector(
  getBarEvents,
  getProps,
  (events, { now = dayjs.utc().add(1, HOUR) } = emptyObj) => {
    return filter(events, (event) => {
      return now.isAfter(event.endAt);
    });
  },
);

export const getUpcomingBarEvents = createSelector(
  getBarEvents,
  getProps,
  (events, { now = dayjs.utc().add(1, HOUR) } = emptyObj) => {
    return filter(events, (event) => {
      return now.isBefore(event.endAt);
    });
  },
);

export const getEventByShortUrl = createSelector(
  getEvents,
  getProps,
  (events, shortUrl) => find(events, (event) => event.shortUrl === shortUrl) || emptyObj,
);
