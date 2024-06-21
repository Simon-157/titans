import find from 'lodash/find';
import isArray from 'lodash/isArray';
import set from 'lodash/set';
import {
  emptyArr,
  LEFT_HAND,
  RIGHT_HAND,
  SCROLLS,
} from 'defaults';
import { asyncEach } from 'lib/object';
import { getWeapons } from './weapon';

export const characterAggregation = [
  {
    $lookup: {
      from: 'usersWeapons',
      localField: '_id',
      foreignField: 'characterId',
      as: 'joinedWeapons',
    },
  },
  {
    $project: {
      _id: 1,
      agility: 1,
      attack: 1,
      defense: 1,
      element: 1,
      isDefensive: 1,
      lastMatchDate: 1,
      level: 1,
      magicka: 1,
      maker: 1,
      // mint: 1,
      name: 1,
      owner: 1,
      rentedUntil: 1,
      scrolls: 1,
      taker: 1,
      userId: 1,
      v: 1,
      weapons: {
        $reduce: {
          input: '$joinedWeapons',
          initialValue: [],
          in: {
            $concatArrays: [
              '$$value',
              ['$$this.weaponId'],
            ],
          },
        },
      },
    },
  },
];

async function findWeapon({ scrolls, weapons, type }) {
  const allWeapons = await getWeapons();

  return find(weapons, (weaponId) => {
    const record = allWeapons[weaponId];

    if (!record) {
      return false;
    }

    const isOfType = record.type === type;

    if (isOfType) {
      scrolls.push(...record.scrolls);
    }

    return isOfType;
  });
}

export async function addWeaponScrolls(character = emptyArr) {
  if (!isArray(character)) {
    // eslint-disable-next-line no-param-reassign
    character = [character];
  }

  await asyncEach(character, async function eachCharacter(item) {
    if (!item.scrolls) {
      set(item, [SCROLLS], []);
    }

    const { scrolls, weapons } = item;

    const leftHand = await findWeapon({ scrolls, weapons, type: LEFT_HAND });
    const rightHand = await findWeapon({ scrolls, weapons, type: RIGHT_HAND });

    if (!leftHand && scrolls.indexOf('titan-punch') === -1) {
      // Empty Left Hand
      scrolls.push('titanic-fists', 'titan-punch');
    }

    // Empty Right Hand
    if (!rightHand && scrolls.indexOf('charge') === -1) {
      scrolls.push('charge', 'explosive-charge');
    }
  });
}
