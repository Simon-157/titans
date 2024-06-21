import { ACTIVE_SEASON, PRODUCTION } from 'defaults';
import { Season } from 'collections';
import redis from 'server/connectors/redis';

const { NODE_ENV } = process.env;

export async function getActiveSeason() {
  // Do not cache on localhost to avoid version diff in the code
  let activeSeason = NODE_ENV === PRODUCTION ?
    await redis.getCache(ACTIVE_SEASON) :
    false;

  if (activeSeason) {
    return activeSeason;
  }

  const season = await Season.collection.findOne({
    active: true,
  }, {
    projection: {
      _id: 1,
    },
  });

  if (season) {
    activeSeason = season._id;

    redis.setCache(ACTIVE_SEASON, activeSeason);
  }

  return activeSeason;
}

export async function clearSeasonCache() {
  redis.setCache(ACTIVE_SEASON, '');
}
