import merge from 'lodash/merge';
import { STRING } from 'defaults';
import { Translation } from 'collections';
import { validate } from '../validate';

export default {
  async get({ data, res }) {
    validate(data, {
      lang: STRING,
    });

    const { lang } = data;

    const translation = {};

    let result = await Translation.collection.findOne({ _id: lang });

    if (result) {
      translation[lang] = result.data;

      result = null;
    }

    let existing;
    try {
      existing = require(`../../../lib/i18n/${lang}.json`);
    } catch(err) {} // eslint-disable-line

    if (translation[lang]) {
      translation[lang] = merge({}, existing, translation[lang]);
    } else {
      translation[lang] = existing;
    }

    res.send({
      translation,
    });

    existing = null;
    delete translation[lang];
  },
};
