import isArray from 'lodash/isArray';
import { BALANCE } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setBalance, setBalances } from './actions';

registerResponseMessage(BALANCE, function registerBalanceResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setBalance(data.data[0]));

      return;
    }

    store.dispatch(setBalances(data.data));

    return;
  }

  store.dispatch(setBalance(data.data));
});
