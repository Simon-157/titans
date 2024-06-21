import each from 'lodash/each';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import times from 'lodash/times';
import {
  emptyObj,
  AGILITY,
  ATTACK,
  BASE_HP,
  BASE_MANA,
  DATA,
  DEFENSE,
  HP_DEF_MULTIPLIER,
  HP_LVL_MULTIPLIER,
  MAGICKA,
  MANA_LVL_MULTIPLIER,
  MANA_MAG_MULTIPLIER,
} from 'defaults';

export const characterFields = [
  AGILITY,
  ATTACK,
  DEFENSE,
  MAGICKA,
];

export const levels = {
  1: {
    id: 1,
    amount: 0,
  },
  2: {
    id: 2,
    amount: 50,
  },
  3: {
    id: 3,
    amount: 150,
  },
  4: {
    id: 4,
    amount: 350,
  },
  5: {
    id: 5,
    amount: 750,
  },
  6: {
    id: 6,
    amount: 1550,
  },
  7: {
    id: 7,
    amount: 3150,
  },
  8: {
    id: 8,
    amount: 6350,
  },
  9: {
    id: 9,
    amount: 12750,
  },
  10: {
    id: 10,
    amount: 25550,
  },
};

export const fakeCharacterIdLength = 17;

export function getAvailablePoints(character = emptyObj) {
  const { level = 1 } = character;

  let points = characterFields.length + 10 + (level * 10);

  each(character, (value = 0, field) => {
    if (characterFields.indexOf(field) === -1) {
      return;
    }

    const tens = (value / 10) | 0;

    const remainder = value % 10;

    let multiplier = 1;

    times(tens, () => {
      points -= (10 * multiplier);

      multiplier += 1;
    });

    points -= (remainder * multiplier);
  });

  return points;
}

export function getHealth({ balance, character = emptyObj } = emptyObj) {
  const { level = 1, defense } = character;

  const tens = (defense / 10) | 0;

  let baseHp = get(balance, [DATA, BASE_HP]);
  if (isNil(baseHp)) {
    baseHp = 200;
  }

  const hpDefMultiplier = get(balance, [DATA, HP_DEF_MULTIPLIER]) || 0;
  const hpLvlMultiplier = get(balance, [DATA, HP_LVL_MULTIPLIER]) || 0;

  return baseHp + (level * hpLvlMultiplier) + (tens * hpDefMultiplier);
}

export function getMana({ balance, character = emptyObj } = emptyObj) {
  const { level = 1, magicka } = character;

  const tens = (magicka / 10) | 0;

  let baseMana = get(balance, [DATA, BASE_MANA]);
  if (isNil(baseMana)) {
    baseMana = 100;
  }

  const manaLvlMultiplier = get(balance, [DATA, MANA_LVL_MULTIPLIER]) || 0;
  const manaMagMultiplier = get(balance, [DATA, MANA_MAG_MULTIPLIER]) || 0;

  return baseMana + (level * manaLvlMultiplier) + (tens * manaMagMultiplier);
}
