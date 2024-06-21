import isArray from 'lodash/isArray';
import { EVENT } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setEvent, setEvents } from './actions';

registerResponseMessage(EVENT, function registerEventResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setEvent(data.data[0]));

      return;
    }

    store.dispatch(setEvents(data.data));

    return;
  }

  store.dispatch(setEvent(data.data));
});
