import isArray from 'lodash/isArray';
import { RENTAL_REQUEST } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setRentalRequest, setRentalRequests } from './actions';

registerResponseMessage(RENTAL_REQUEST, function registerUserItemResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setRentalRequest(data.data[0]));

      return;
    }

    store.dispatch(setRentalRequests(data.data));

    return;
  }

  store.dispatch(setRentalRequest(data.data));
});
