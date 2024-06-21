import { GLOBAL } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setGlobal } from './actions';

registerResponseMessage(GLOBAL, function registerGlobalResponse(store, data) {
  store.dispatch(setGlobal(data.data));
});
