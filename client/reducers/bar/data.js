import isArray from 'lodash/isArray';
import { BAR } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setBar, setBars } from './actions';

registerResponseMessage(BAR, function registerBarResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setBar(data.data[0]));

      return;
    }

    store.dispatch(setBars(data.data));

    return;
  }

  store.dispatch(setBar(data.data));
});
