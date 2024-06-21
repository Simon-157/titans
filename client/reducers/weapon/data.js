import isArray from 'lodash/isArray';
import { WEAPON } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setWeapon, setWeapons } from './actions';

registerResponseMessage(WEAPON, function registerWeaponResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setWeapon(data.data[0]));

      return;
    }

    store.dispatch(setWeapons(data.data));

    return;
  }

  store.dispatch(setWeapon(data.data));
});
