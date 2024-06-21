import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import get from 'lodash/get';
import {
  emptyObj,
  CHARACTER,
  LIST,
  ACTIVE_CHARACTER_ID,
  getProps,
} from 'defaults';

export function getCharacters(state = emptyObj) {
  return get(state, [CHARACTER, LIST], emptyObj);
}

export function getActiveCharacter(state = emptyObj) {
  const activeCharacterId = get(state, [CHARACTER, ACTIVE_CHARACTER_ID], '');
  return get(state, [CHARACTER, LIST, activeCharacterId], null);
}

export const getCharacter = createSelector(
  getCharacters,
  getProps,
  (characters, id) => get(characters, [id], emptyObj),
);

export const getUserCharacters = createSelector(
  getCharacters,
  getProps,
  (characters, userId) => {
    return filter(characters, (c) => c.userId === userId);
  },
);

export const getOwnedCharacters = createSelector(
  getCharacters,
  getProps,
  (characters, userId) => {
    return filter(characters, (c) => {
      const { owner = c.userId } = c;

      return owner === userId;
    });
  },
);

export const getRentedCharacters = createSelector(
  getCharacters,
  getProps,
  (characters, userId) => {
    return filter(characters, (c) => {
      const { taker } = c;

      return taker === userId;
    });
  },
);

export const getCharactersForRent = createSelector(
  getCharacters,
  (characters) => {
    return filter(characters, (c) => c.maker);
  },
);
