import { GET, TRANSLATION } from 'defaults';
import { executePrimusRequest } from 'client/request';
import { requested } from 'client/request/requested';

export function requestTranslation(lang, cb) {
  if (!requested[lang]) {
    requested[lang] = true;

    executePrimusRequest(GET, TRANSLATION, { lang }, cb);
  }
}
