import get from 'lodash/get';

export function getClientIpAddress(req) {
  if (!req) {
    return null;
  }

  let ip = req.headers['x-forwarded-for'] ||
    get(req.connection, ['remoteAddress']) ||
    get(req.socket, ['remoteAddress']) ||
    get(req.connection, ['socket', 'remoteAddress']);

  if (!ip) {
    return null;
  }

  [ip] = ip.split(',');

  if (ip.indexOf('.') !== -1) {
    [ip] = ip.split(':');
  }

  return ip;
}
