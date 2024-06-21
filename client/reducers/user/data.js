import isArray from 'lodash/isArray';
import { USER } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setUser, setUsers } from './actions';

registerResponseMessage(USER, function registerUserResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setUser(data.data[0]));

      return;
    }

    store.dispatch(setUsers(data.data));

    return;
  }

  store.dispatch(setUser(data.data));
});
