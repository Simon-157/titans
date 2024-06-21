import dayjs from 'dayjs';
import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import {
  emptyObj,
  emptyStr,
  ACTIVE_CHARACTER_ID,
  LAST_MATCH_DATE,
  LIST,
  RENTED_UNTIL,
} from 'defaults';
import { getInitialState } from './state';

export const DELETE_CHARACTER = 'CHARACTER_DELETE_CHARACTER';
export const SET_CHARACTER = 'CHARACTER_SET_CHARACTER';
export const SET_CHARACTERS = 'CHARACTER_SET_CHARACTERS';
export const SET_ACTIVE_CHARACTER_ID = 'CHARACTER_SET_ACTIVE';

const reducer = {};

// Clear characters data on user logout
reducer.USER_SET_CURRENT = (state, { user = emptyObj }) => {
  const { id } = user;

  if (!id) {
    return getInitialState();
  }

  return state;
};

reducer[DELETE_CHARACTER] = (state, { id } = emptyObj) => {
  // eslint-disable-next-line no-param-reassign
  delete state.list[id];

  return state;
};

export function setCharacter(character = emptyObj) {
  return {
    type: SET_CHARACTER,
    character,
  };
}

reducer[SET_CHARACTER] = (state, { character }) => {
  const { _id, remove } = character || emptyObj;

  if (remove) {
    return reducer[DELETE_CHARACTER](state, { id: remove });
  }

  if (!_id) {
    return state;
  }

  each(character, (value, field) => {
    if (field === LAST_MATCH_DATE || field === RENTED_UNTIL) {
      let date = value;
      if (value) {
        date = dayjs(value);
      }

      set(state, [LIST, _id, field], date);

      return;
    }

    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setActiveCharacterId(_id = emptyStr) {
  return {
    type: SET_ACTIVE_CHARACTER_ID,
    _id,
  };
}

reducer[SET_ACTIVE_CHARACTER_ID] = (state, { _id }) => {
  localStorage.setItem(ACTIVE_CHARACTER_ID, _id);

  return {
    ...state,
    [ACTIVE_CHARACTER_ID]: _id,
  };
};

export function setCharacters(characters) {
  return {
    type: SET_CHARACTERS,
    characters,
  };
}

reducer[SET_CHARACTERS] = (state, { characters }) => {
  if (!characters.length) {
    return state;
  }

  const activeCharacterId = get(state, ACTIVE_CHARACTER_ID);

  let activeCharacterExists = false;

  if (activeCharacterId) {
    activeCharacterExists = characters.find(({ _id }) => _id === activeCharacterId);
  }

  if (!activeCharacterExists) {
    // Add logic to set ACTIVE_CHARACTER_ID id of last character used in battle
    // Currenly first character is set as active
    set(state, ACTIVE_CHARACTER_ID, characters[0]._id);
    localStorage.setItem(ACTIVE_CHARACTER_ID, characters[0]._id);
  }

  return reduce(characters, (reducedState, character) => {
    return reducer[SET_CHARACTER](reducedState, { character });
  }, state);
};

export function characterReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
