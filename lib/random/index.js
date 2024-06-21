import floor from 'lodash/floor';

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';

function choice(arr) {
  const index = floor(Math.random() * arr.length);

  return arr[index];
}

export function randomString(charsCount = 17, alphabet = ALPHABET) {
  let digits = '';

  let i = charsCount;
  while (i-- > 0) {
    digits += choice(alphabet);
  }

  return digits;
}

export function secret(charsCount = 43) {
  return randomString(charsCount, ALPHABET);
}

export function randomId(charsCount = 17) {
  return randomString(charsCount, ALPHABET);
}

export function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default {
  randomId,
  randomIntFromInterval,
  randomString,
  secret,
};
