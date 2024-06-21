import { SETTINGS } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setSettings } from './actions';

registerResponseMessage(SETTINGS, function registerUserItemResponse(store, data) {
  store.dispatch(setSettings(data.data));
});
