import { resolve } from 'path';
import ect from 'ect';
import { cwd, isDev } from '../config';

export { getLangByCountry, t } from './i18n';

const renderer = ect({
  close: '}}',
  root: resolve(cwd, 'server/templates'),
  ext: '.ect',
  open: '{{',
  watch: isDev,
});

export default renderer;
