import isArray from 'lodash/isArray';
import { CODE } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setCode, setCodes } from './actions';

registerResponseMessage(CODE, function registerCodeResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setCode(data.data[0]));

      return;
    }

    store.dispatch(setCodes(data.data));

    return;
  }

  store.dispatch(setCode(data.data));
});
