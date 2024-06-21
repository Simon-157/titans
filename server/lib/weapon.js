import keyBy from 'lodash/keyBy';
import size from 'lodash/size';
import { emptyObj, _ID, WEAPONS } from 'defaults';
import { Weapon } from 'collections';
import redis from 'server/connectors/redis';

async function cacheWeapons() {
  const weaponsArr = await Weapon.findAll(emptyObj, {
    projection: {
      _id: 1,
      rarity: 1,
      scrolls: 1,
      type: 1,
    },
  });

  await redis.setCache(WEAPONS, keyBy(weaponsArr, _ID));
}

export async function getWeapons() {
  let weapons = await redis.getCache(WEAPONS);

  if (size(weapons) !== 0) {
    return weapons;
  }

  await cacheWeapons();

  weapons = await redis.getCache(WEAPONS);

  return weapons;
}
