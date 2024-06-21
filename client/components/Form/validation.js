import get from 'lodash/get';
import { FORM, REQUIRED } from 'defaults';
import { t } from 'lib/i18n';

export function getError(value, props, state) {
  const { required, validationErrors } = props;

  const { _formSubmitted } = state;

  return required && _formSubmitted && !value ?
    get(validationErrors, [REQUIRED]) || t([FORM, 'notFilledIn']) :
    null;
}
