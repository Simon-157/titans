import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import each from 'lodash/each';
import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';
import size from 'lodash/size';
import { emptyObj, EN, LANG, PROPS, langs } from 'defaults';
import { escapeRegExp } from 'lib/string';
// import { registerResponseMessage } from 'client/request/messages';
import { getLang as getLangSelector } from 'reducers/global/selectors';
import en from './en.json';

const defaultLang = EN;
export const defaultLocale = 'en-GB';

export function getLocale() {
  if (!global.navigator) {
    return defaultLocale;
  }

  let detected;
  if (size(navigator.languages)) {
    detected = navigator.languages[0];
  } else {
    detected = navigator.language;
  }

  return detected || defaultLocale;
}

export function getDetectedLang() {
  if (!global.navigator) {
    return defaultLang;
  }

  let detected;
  if (size(navigator.languages)) {
    detected = navigator.languages[0];
  } else {
    detected = navigator.language;
  }

  if (detected) {
    detected = detected.substring(0, 2);

    if (langs.indexOf(detected) !== -1) {
      return detected;
    }
  }

  return defaultLang;
}

const options = {
  lang: global.localStorage ?
    (localStorage.getItem(LANG) || getDetectedLang()) :
    getDetectedLang(),
};

const { lang: currentLang } = options;

const translations = {
  en,
};

if (!translations[currentLang]) {
  try {
    translations[currentLang] = require(`./${currentLang}.json`);
  } catch (err) {} // eslint-disable-line
}

export function getLang() {
  return options.lang;
}

export function setLang(lang = defaultLang) {
  if (langs.indexOf(lang) === -1) {
    return;
  }

  if (global.localStorage) {
    localStorage.setItem(LANG, lang);
  }

  set(options, [LANG], lang);

  if (!translations[lang]) {
    try {
      translations[lang] = require(`./${lang}.json`);
    } catch (err) {} // eslint-disable-line
  }
}

export function setTranslation(data) {
  each(data.data, (translation, lang) => {
    translations[lang] = merge(translations[lang], translation);
  });
}

const mapStateToProps = (state) => {
  return {
    lang: getLangSelector(state),
  };
};

const openRegExp = escapeRegExp('{{');
const closeRegExp = escapeRegExp('}}');
const splitRegExp = new RegExp(`${openRegExp}((?:.|[\r\n])+?)(?:${closeRegExp}|$)`);
const trimRegExp = /^[ \t]+|[ \t]+$/g;

export function t(path, opts) {
  const { lang = get(options, [LANG], defaultLang) } = get(this, [PROPS], emptyObj);

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

function i18n(Comp) {
  class I18N extends Component {
    static propTypes = {
      lang: PropTypes.string,
    }

    static defaultProps = {
      lang: defaultLang,
    }

    constructor(props) {
      super(props);

      this.t = t.bind(this);
    }

    render() {
      return (
        <Comp
          {...this.props}
          lang={options.lang}
          t={this.t}
        />
      );
    }
  }

  return connect(mapStateToProps)(I18N);
}

export default i18n;
