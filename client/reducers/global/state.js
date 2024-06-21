import { LANG } from 'defaults';
import { getDetectedLang } from 'lib/i18n';

export function getInitialState() {
  return {
    alerts: [],
    lang: global.localStorage ?
      localStorage.getItem(LANG) || getDetectedLang() :
      getDetectedLang(),
  };
}
