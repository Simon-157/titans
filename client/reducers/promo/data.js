import isArray from 'lodash/isArray';
import { PROMO } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setPromo, setPromos } from './actions';

registerResponseMessage(PROMO, function registerPromoResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setPromo(data.data[0]));

      return;
    }

    store.dispatch(setPromos(data.data));

    return;
  }

  store.dispatch(setPromo(data.data));
});
