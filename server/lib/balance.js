import { emptyStr, ACTIVE, BALANCE_VERSION } from 'defaults';
import { Balance } from 'collections';
import redis from 'server/connectors/redis';

export async function getActiveBalanceVersion() {
  let balanceVersion = await redis.getCache(BALANCE_VERSION);

  if (balanceVersion) {
    return balanceVersion;
  }

  const balance = await Balance.collection.findOne({
    active: true,
  }, {
    projection: {
      _id: 1,
    },
  });

  if (balance) {
    balanceVersion = balance._id;

    redis.setCache(BALANCE_VERSION, balanceVersion);
  }

  return balanceVersion;
}

export async function clearBalanceCache() {
  await Promise.all([
    redis.setCache(BALANCE_VERSION, ''),
    redis.setCache(`balance-${ACTIVE}`, emptyStr),
  ]);

  global.updateSub('activeBalance?');
}

export async function clearBalanceCacheByVersion(version) {
  if (!version) {
    return;
  }

  await redis.setCache(`balance-${version}`, emptyStr);
}

export async function getBalance(version) {
  const key = `balance-${version || ACTIVE}`;

  const cached = await redis.getCache(key);

  if (cached) {
    return cached;
  }

  const query = {};

  if (version) {
    query._id = version;
  } else {
    query.active = true;
  }

  const balance = await Balance.collection.findOne(query, {
    projection: {
      _id: 1,
      active: 1,
      data: 1,
      datePublished: 1,
    },
  });

  if (!balance) {
    return null;
  }

  const { _id, active, datePublished } = balance;

  if (active) {
    redis.setCache(BALANCE_VERSION, _id);
    redis.setCache(key, balance);
  }

  if (datePublished) {
    redis.setCache(`balance-${_id}`, balance);
  }

  return balance;
}
