import { createClient } from 'redis';
import set from 'lodash/set';
import { CRYPTO_TITANS, DATA, ERROR, RESPONSE, TEST } from 'defaults';
import { isDev } from '../config';
import { currentServerId, redisOptions } from './options';
import { multiServerBroadcast } from './redis';
import { writeLog } from '../primus/log';

const { NODE_ENV, REDIS_SUB } = process.env;

const isTest = NODE_ENV === TEST;

const sub = createClient(redisOptions);

if (isDev) {
  sub.connect();

  if (!isTest) {
    sub.select(REDIS_SUB);

    sub.on(ERROR, (err) => {
    console.log(`RedisSUB Error ${err}`); // eslint-disable-line
    });

    sub.on('connect', () => {
    console.log('RedisSUB client connected'); // eslint-disable-line
    });
  }
}

function broadcast({ subscription, data, websocketId }) {
  if (global.primus && global.primus.room) {
    if (websocketId) {
      // send to all OTHER connections
      // eslint-disable-next-line consistent-return
      global.primus.room(subscription).transform(function transform(packet) {
        // do not send to the current connection (if provided) since we have already sent to it above
        if (websocketId && this.id === websocketId) {
          return false;
        }

        set(packet, [DATA, 0, DATA], [RESPONSE, null, data]);
      }).write({
        type: 0,
      });

      return;
    }

    global.primus.room(subscription).write({
      type: 0,
      data: [RESPONSE, null, data],
    });
  }
}

export const syncWithOpenedSockets = (payload) => {
  multiServerBroadcast(payload);

  broadcast(payload);
};

function onRequest(msg) {
  let data;
  let serverId;
  let subscription;
  let websocketId;

  try {
    ({ data, serverId, subscription, websocketId } = JSON.parse(msg));
  } catch (err) {
    console.log('JSON.parse(msg) error', err); // eslint-disable-line

    const { stack } = err;

    writeLog(null, {
      message: err,
      server: true,
      stack,
      type: ERROR,
    });

    return;
  }

  // we have already handled the broadcast for currentServerId
  if (serverId === currentServerId) {
    return;
  }

  broadcast({ subscription, data, websocketId });
}

if (isDev) {
  sub.subscribe(CRYPTO_TITANS, onRequest);

  setInterval(() => {
    sub.ping();
  }, 55000);
}
