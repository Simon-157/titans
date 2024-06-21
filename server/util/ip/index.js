import get from 'lodash/get';
import { SOCKET } from 'defaults';

export function getClientIpAddress(req) {
  let ip = req.headers['x-proxyuser-ip'] ||
    req.headers['x-forwarded-for'] ||
    get(req.connection, ['remoteAddress']) ||
    get(req.socket, ['remoteAddress']) ||
    get(req.connection, [SOCKET, 'remoteAddress']);

  if (!ip) {
    return null;
  }

  [ip] = ip.split(',');

  if (ip.indexOf('.') !== -1) {
    [ip] = ip.split(':');
  }

  return ip;
}
