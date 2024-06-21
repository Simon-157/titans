import each from 'lodash/each';
import isFunction from 'lodash/isFunction';
import { emptyObj, JWT } from 'defaults';
import { handleError } from 'lib/error';
import { deleteCookie } from 'client/lib/cookie';
import { addError } from 'reducers/global/actions';
import messages from '../messages';

let globalStore;

export function resetUser() {
  localStorage.removeItem(JWT);
  deleteCookie(JWT);

  return {
    type: 'USER_SET_CURRENT',
  };
}

function showError(err) {
  console.error('Request error:', err); // eslint-disable-line

  globalStore.dispatch(addError(err));
}

export const response = {
  handler: (err, data, options = emptyObj) => {
    if (err) {
      const error = handleError(err);

      if (
        error.indexOf('please login again') !== -1 ||
        error.indexOf('jwt expired') !== -1
      ) {
        globalStore.dispatch(resetUser());
      } else if (!options.skipError) {
        showError(err);
      }
    }
  },
};

export function useStore(store) {
  globalStore = store;

  response.handler = (err, data, options = emptyObj) => {
    if (err) {
      const error = handleError(err);

      if (
        error.indexOf('please login again') !== -1 ||
        error.indexOf('jwt expired') !== -1
      ) {
        globalStore.dispatch(resetUser());
      } else if (!options.skipError) {
        showError(err);
      }

      return;
    }

    each(data, (items, type) => {
      if (!isFunction(messages[type])) {
        return;
      }

      messages[type](store, {
        err,
        data: items,
      });
    });
  };
}
