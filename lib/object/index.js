import each from 'lodash/each';
import every from 'lodash/every';
import get from 'lodash/get';
import keys from 'lodash/keys';
import some from 'lodash/some';
import { escapeRegExp } from '../string';

export async function asyncEach(obj, cb) {
  const keysArr = keys(obj);

  let keysArrLength = keysArr.length;
  while (keysArrLength-- > 0) {
    const key = keysArr[keysArrLength];

    const item = obj[key];

    // eslint-disable-next-line no-await-in-loop
    await cb(item, key);
  }
}

export function findInObject(obj, searchString = '', keysToSearch) {
  if (!searchString) {
    return false;
  }

  const searchRegexps = [];

  const searchWords = searchString.split(' ');

  each(searchWords, (word) => {
    const regexp = new RegExp(escapeRegExp(word), 'i');
    searchRegexps.push(regexp);
  });

  return every(searchRegexps, (regexp) => some(keysToSearch, (key) => regexp.test(get(obj, key))));
}

export function sort(obj) {
  const result = {};

  const keysArr = keys(obj).sort();

  const keysLength = keysArr.length;

  for (let i = 0; i < keysLength; i++) {
    const key = keysArr[i];

    result[key] = obj[key];
  }

  return result;
}

export function getRandomKey(obj) {
  const k = keys(obj);

  return k[Math.floor(Math.random() * k.length)];
}

export function getRandomEl(coll) {
  return coll[getRandomKey(coll)];
}

export function removeEmptyValues(obj) {
  return JSON.parse(JSON.stringify(obj, (k, v) => {
    return v || undefined;
  }));
}

export function splitArrayByQuantity(arr, quantity) {
  const result = [];
  for (let i = 0; i < arr.length; i += quantity) {
    result.push(arr.slice(i, i + quantity));
  }
  return result;
}
