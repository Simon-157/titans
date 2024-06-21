import each from 'lodash/each';
import isNil from 'lodash/isNil';
import { emptyObj, NUMBER } from 'defaults';

export function validate(data = emptyObj, fields) {
  let field;
  let invalidType;
  each(fields, (type, key) => {
    const value = data[key];

    const valueType = typeof value;

    if (
      (valueType === NUMBER ? isNil(value) : !value) ||
      (valueType !== type)
    ) {
      field = key;
      invalidType = type;

      return false;
    }

    return true;
  });

  if (invalidType) {
    throw `400 - "${field}" field is required as ${invalidType}`;
  }
}
