import each from 'lodash/each';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { emptyObj, LIST } from 'defaults';
import { getInitialState } from './state';

export const SET_WEAPON = 'WEAPON_SET_WEAPON';
export const SET_WEAPONS = 'WEAPON_SET_WEAPONS';

const reducer = {};

export function setWeapon(weapon = emptyObj) {
  return {
    type: SET_WEAPON,
    weapon,
  };
}

reducer[SET_WEAPON] = (state, { weapon }) => {
  const { _id } = weapon || emptyObj;

  if (!_id) {
    return state;
  }

  each(weapon, (value, field) => {
    set(state, [LIST, _id, field], value);
  });

  return state;
};

export function setWeapons(weapons) {
  return {
    type: SET_WEAPONS,
    weapons,
  };
}

reducer[SET_WEAPONS] = (state, { weapons }) => {
  return reduce(weapons, (reducedState, weapon) => {
    return reducer[SET_WEAPON](reducedState, { weapon });
  }, state);
};

export function weaponReducer(state = getInitialState(), action = emptyObj) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
}
