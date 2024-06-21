import isArray from 'lodash/isArray';
import { LOOTBOX } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setLootbox, setLootboxes } from './actions';

registerResponseMessage(LOOTBOX, function registerLootboxResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setLootbox(data.data[0]));

      return;
    }

    store.dispatch(setLootboxes(data.data));

    return;
  }

  store.dispatch(setLootbox(data.data));
});
