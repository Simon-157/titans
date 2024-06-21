import each from 'lodash/each';
import { TRANSLATION } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setTranslation as setI18nTranslation } from 'lib/i18n';
import { setTranslation } from './actions';

registerResponseMessage(TRANSLATION, function registerTranslationResponse(store, data) {
  setI18nTranslation(data);

  each(data.data, (translation, lang) => {
    store.dispatch(setTranslation(lang, translation));
  });
});
