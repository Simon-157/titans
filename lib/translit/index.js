import { sanitizeString } from '../string';

const options = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  ґ: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  і: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ы: 'y',
  э: 'e',
  ю: 'yu',
  я: 'ya',
  ї: 'yi',
  є: 'ye',
  à: 'a',
  á: 'a',
  ã: 'a',
  ä: 'a',
  ç: 'c',
  é: 'e',
  ê: 'e',
  í: 'i',
  ó: 'o',
  õ: 'o',
  ú: 'u',
  '&': 'n',
  _: '-',
  '-': '-',
  ' ': '-',
  '.': '-',
  '. ': '-',
  ' - ': '-',
  ' – ': '-',
  ' — ': '-',
  '/': '-',
  ' / ': '-',
  ' | ': '-',
  ' : ': '-',
  ' (': '-',
  ') ': '-',
  '* ': '',
  ' @ ': '-',
};

const keys = Object.keys(options).sort((a, b) => b.length - a.length);

const safeCharacterRegExp = /[A-Za-z0-9]/;

const startsWith = function startsWith(start, str) {
  const { length } = start;
  for (let i = 0; i < length; i++) {
    if (start[i] !== str[i]) {
      return false;
    }
  }

  return true;
};

const peek = function peek(str) {
  const { length } = keys;

  for (let i = 0; i < length; i++) {
    if (startsWith(keys[i], str)) {
      return keys[i];
    }
  }

  return false;
};

export default function translit(str) {
  let result = '';

  let process = sanitizeString(str);

  while (process) {
    const key = peek(process);

    if (key) {
      result += options[key];
      process = process.slice(key.length);
    } else {
      if (safeCharacterRegExp.test(process[0])) {
        result += process[0];
      }

      process = process.slice(1);
    }
  }

  return result;
}
