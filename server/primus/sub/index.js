import dayjs from 'dayjs';
import isFunction from 'lodash/isFunction';
import redis from 'server/connectors/redis';
import refreshes from './refreshes';
import subs from './subs';
import './functions';

export async function getSub(data) {
  const { name, props = {}, subName } = data;

  const updateId = dayjs().valueOf();

  // check if cached
  const prevSub = await redis.getPublication(subName);

  if (!process.env.DISABLE_CACHING && prevSub) {
    const refresh = refreshes[name];

    if (!refresh || ((updateId - prevSub.updateId) < refresh)) {
      return prevSub;
    }
  }

  const sub = subs[name];

  if (!isFunction(sub)) {
    throw `Sub ${name} not found`;
  }

  // get from db and save in chace
  const subData = await sub(props);

  const result = {
    data: subData,
    updateId,
  };

  if (subData && !subData.noCache) {
    redis.setPublication(subName, result);
  }

  return result;
}
