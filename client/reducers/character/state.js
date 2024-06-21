import {
  LIST,
  ACTIVE_CHARACTER_ID,
} from 'defaults';

export const list = {};

let activeCharacterId = '';

if (global.__CLIENT__) {
  activeCharacterId = localStorage.getItem(ACTIVE_CHARACTER_ID) || '';
}

export function getInitialState() {
  return {
    [LIST]: {},
    [ACTIVE_CHARACTER_ID]: activeCharacterId,
  };
}
