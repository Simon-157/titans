import { randomId } from 'lib/random';

const {
  REDIS_HOST,
  REDIS_KEY,
  REDIS_PORT,
  REDIS_SOCKET_KEEPALIVE,
} = process.env;

export const currentServerId = randomId();

export const redisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  socket_keepalive: REDIS_SOCKET_KEEPALIVE,
  ...(
    REDIS_KEY ? {
      auth_pass: REDIS_KEY,
      tls: {
        servername: REDIS_HOST,
      },
    } : {}
  ),
};
