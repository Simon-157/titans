import isArray from 'lodash/isArray';
import { CHARACTER } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setCharacters } from './actions';

registerResponseMessage(CHARACTER, function registerCharacterResponse(store, data) {
  if (isArray(data.data)) {
    store.dispatch(setCharacters(data.data));
    return;
  }

  store.dispatch(setCharacters([data.data]));
});
