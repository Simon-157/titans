import get from 'lodash/get';
import size from 'lodash/size';
import { EN } from 'defaults';
import { escapeRegExp } from 'lib/string';
import en from './en.json';

export { getLangByCountry } from './country';

const defaultLang = EN;

const translations = {
  en,
};

const openRegExp = escapeRegExp('{{');
const closeRegExp = escapeRegExp('}}');
const splitRegExp = new RegExp(`${openRegExp}((?:.|[\r\n])+?)(?:${closeRegExp}|$)`);
const trimRegExp = /^[ \t]+|[ \t]+$/g;

export function t(path, lang = defaultLang, opts) {
  if (!translations[lang]) {
    try {
      translations[lang] = require(`./${lang}.json`);
    } catch (err) {} // eslint-disable-line
  }

  const value = get(translations[lang], path) ||
    get(translations[defaultLang], path, path);

  if (size(opts) !== 0) {
    const matches = value.split(splitRegExp);

    const matchesLength = matches.length;

    let buffer = '';
    let text;

    for (let i = 0; i < matchesLength; i++) {
      text = matches[i];

      if (i % 2 === 1) {
        text = text.replace(trimRegExp, '');

        const val = get(opts, text);

        if (val) {
          buffer += `${val}`.replace(/</g, '\\u003c');

          continue;
        }
      }

      buffer += text;
    }

    return buffer;
  }

  return value;
}
