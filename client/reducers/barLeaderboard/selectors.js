import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import {
  emptyObj,
  BAR_LEADERBOARD,
  LIST,
  POINTS,
  getProps,
} from 'defaults';

export function getLeaderboards(state = emptyObj) {
  return get(state, [BAR_LEADERBOARD, LIST], emptyObj);
}

export const getBarLeaderboard = createSelector(
  getLeaderboards,
  getProps,
  (records, { barId } = emptyObj) => {
    return orderBy(filter(records, (record) => record.barId === barId), POINTS);
  },
);
