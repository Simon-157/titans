import get from 'lodash/get';
import isString from 'lodash/isString';
import { emptyStr, DATA, ERR } from 'defaults';

const nonDescriptiveErrorObject = '[object Object]';

export function handleError(err = emptyStr) {
  const error = get(err.response, [DATA, ERR]) || err;

  let str = error.toString();

  if (str === nonDescriptiveErrorObject) {
    if (isString(err.reason)) {
      str = err.reason;
    } else if (isString(err.message)) {
      str = err.message;
    } else if (isString(err.errorMessage)) {
      str = err.errorMessage;
    } else if (isString(err.details)) {
      str = err.details;
    } else if (err.status) {
      str = err.status;
    }
  }

  // handle axios config for more descriptive error message
  if (err.config && err.config.url) {
    str += ` - ${err.config.url}`;
  }

  return str;
}
