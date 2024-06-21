import { createClient } from 'redis';
import { CRYPTO_TITANS, ERROR, TEST } from 'defaults';
import { isDev } from '../config';
import { currentServerId, redisOptions } from './options';

const { NODE_ENV, REDIS_PUBLICATIONS_DATA } = process.env;

const isTest = NODE_ENV === TEST;

export const client = createClient(redisOptions);

if (isDev) {
  client.connect();

  if (!isTest) {
    client.select(REDIS_PUBLICATIONS_DATA);

    client.on(ERROR, (err) => {
    console.log(`RedisCACHE Error ${err}`); // eslint-disable-line
    });

    client.on('connect', () => {
    console.log('RedisCACHE client connected'); // eslint-disable-line
    });
  }
}

const cache = {};

async function getPublication(publicationName) {
  const publication = await client.get(publicationName);

  return JSON.parse(publication);
}

async function setPublication(publicationName, data) {
  await client.set(publicationName, JSON.stringify(data));
}

async function getPublicationNamesByKey(publicationName) {
  return client.keys(publicationName);
}

async function getCache(name) {
  if (isTest) {
    return cache[name] || '';
  }

  const data = await client.get(name);

  return JSON.parse(data);
}

async function setCache(name, data) {
  if (isTest) {
    cache[name] = data;

    return;
  }

  await client.set(name, JSON.stringify(data));
}

export function multiServerBroadcast({
  subscription,
  data,
  serverId = currentServerId,
  websocketId,
}) {
  if (isDev && !isTest) {
    console.log('popped', subscription); // eslint-disable-line
  }

  const msg = JSON.stringify({ data, serverId, subscription, websocketId });

  client.publish(CRYPTO_TITANS, msg);
}

if (isDev) {
  setInterval(() => {
    client.ping();
  }, 55000);
}

export default {
  client,
  getCache,
  getPublication,
  getPublicationNamesByKey,
  multiServerBroadcast,
  setCache,
  setPublication,
};
