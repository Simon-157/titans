import isArray from 'lodash/isArray';
import { BAR_LEADERBOARD } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setBarLeaderboard, setBarLeaderboards } from './actions';

registerResponseMessage(BAR_LEADERBOARD, function registerBarLeaderboardResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setBarLeaderboard(data.data[0]));

      return;
    }

    store.dispatch(setBarLeaderboards(data.data));

    return;
  }

  store.dispatch(setBarLeaderboard(data.data));
});
