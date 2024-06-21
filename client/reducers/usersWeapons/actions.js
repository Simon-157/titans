import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, EQUIPPED_AT, LIST } from 'defaults';
import { getInitialState } from './state';

export const SET_USER_WEAPON = 'USER_WEAPON_SET_WEAPON';
export const SET_USER_WEAPONS = 'USER_WEAPON_SET_WEAPONS';

const reducer = {};

export function setUserWeapon(weapon = emptyObj) {
  return {
    type: SET_USER_WEAPON,
    weapon,
  };
}

reducer[SET_USER_WEAPON] = (state, { weapon }) => {
  const { _id } = weapon || emptyObj;

  if (!_id) {
    return state;
  }

  each(weapon, (value, field) => {
    if (field === EQUIPPED_AT && value) {
      // eslint-disable-next-line no-param-reassign
      value = new Date(value);
    }

    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setUserWeapons(weapons) {
  return {
    type: SET_USER_WEAPONS,
    weapons,
  };
}

reducer[SET_USER_WEAPONS] = (state, { weapons }) => {
  return reduce(weapons, (reducedState, weapon) => {
    return reducer[SET_USER_WEAPON](reducedState, { weapon });
  }, {});
};

export function usersWeaponsReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
