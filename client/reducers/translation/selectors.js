import { createSelector } from 'reselect';
import each from 'lodash/each';
import get from 'lodash/get';
import keys from 'lodash/keys';
import {
  emptyObj,
  emptyStr,
  getProps,
  LIST,
  TRANSLATION,
} from 'defaults';

export function flattenObject(obj, prefix = false, result = null) {
  // eslint-disable-next-line no-param-reassign
  result = result || {};

  // Preserve empty objects and arrays, they are lost otherwise
  if (prefix && typeof ob === 'object' && obj !== null && keys(obj).length === 0) {
    // eslint-disable-next-line no-param-reassign
    result[prefix] = Array.isArray(obj) ? [] : {};

    return result;
  }

  // eslint-disable-next-line no-param-reassign
  prefix = prefix ? `${prefix}.` : '';

  each(obj, (val, key) => {
    if (typeof val === 'object' && val !== null) {
      // Recursion on deeper objects
      flattenObject(val, prefix + key, result);
    } else {
      // eslint-disable-next-line no-param-reassign
      result[prefix + key] = val;
    }
  });

  return result;
}

export function getTranslation(state) {
  return get(state, [TRANSLATION, LIST], emptyObj);
}

export const getKeys = createSelector(
  getTranslation,
  getProps,
  (translations, lang) => {
    return keys(flattenObject(translations[lang]));
  },
);

export const getValue = createSelector(
  getTranslation,
  getProps,
  (translations, { lang, path } = emptyObj) => {
    return get(translations[lang], path) || emptyStr;
  },
);
