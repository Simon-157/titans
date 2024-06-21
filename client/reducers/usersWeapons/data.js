import isArray from 'lodash/isArray';
import { USERS_WEAPONS } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setUserWeapon, setUserWeapons } from './actions';

registerResponseMessage(USERS_WEAPONS, function registerUserItemResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setUserWeapon(data.data[0]));

      return;
    }

    store.dispatch(setUserWeapons(data.data));

    return;
  }

  store.dispatch(setUserWeapon(data.data));
});
