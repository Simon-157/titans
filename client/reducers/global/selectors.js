import get from 'lodash/get';
import {
  emptyArr,
  emptyObj,
  ALERTS,
  EN,
  GLOBAL,
  LANG,
} from 'defaults';

export function getGlobal(state = emptyObj) {
  return get(state, [GLOBAL], emptyObj);
}

export function getAlerts(state = emptyObj) {
  return get(state, [GLOBAL, ALERTS], emptyArr);
}

export function getLang(state = emptyObj) {
  return get(state, [GLOBAL, LANG], EN);
}
