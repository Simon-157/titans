import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import setWith from 'lodash/setWith';
import { emptyObj, GET, LIST, TRANSLATION } from 'defaults';
import { executePrimusRequest } from 'client/request';
import { requested } from 'client/request/requested';
import { getInitialState } from './state';

export const SET_TRANSLATION = 'TRANSLATION_SET_TRANSLATION';
export const SET_TRANSLATIONS = 'TRANSLATION_SET_TRANSLATIONS';
export const SET_VALUE = 'TRANSLATION_SET_VALUE';

const reducer = {};

export function requestTranslation(lang, cb) {
  if (!requested[lang]) {
    requested[lang] = true;

    executePrimusRequest(GET, TRANSLATION, { lang }, cb);
  }
}

export function setTranslation(lang, translation = emptyObj) {
  return {
    type: SET_TRANSLATION,
    lang,
    translation,
  };
}

reducer[SET_TRANSLATION] = (state, { lang, translation = emptyObj }) => {
  if (!lang) {
    return state;
  }

  each(translation, (value, key) => {
    set(state, [LIST, lang, key], value);
  });

  return state;
};

export function setTranslations(translations) {
  return {
    type: SET_TRANSLATIONS,
    translations,
  };
}

reducer[SET_TRANSLATIONS] = (state, { translations }) => {
  return reduce(translations, (reducedState, translation, lang) => {
    return reducer[SET_TRANSLATION](reducedState, { lang, translation });
  }, state);
};

export function setValue(lang, path, value) {
  return {
    type: SET_VALUE,
    lang,
    path,
    value,
  };
}

reducer[SET_VALUE] = (state, { lang, path, value }) => {
  if (!lang) {
    return state;
  }

  setWith(state, [LIST, lang, ...path.split('.')], value, Object);

  return state;
};

export function translationReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
