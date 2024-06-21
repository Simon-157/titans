import { HOST, LOCALHOST, ORIGIN, defaultRes } from 'defaults';
import { writeLog } from '../../primus/log';
import { isDev } from '../../config';

function debugDomain(data) {
  writeLog(null, {
    data,
    server: true,
    type: 'debug',
  });
}

function getDomain(req) {
  if (isDev) {
    return LOCALHOST;
  }

  let domain;

  const origin = req.get(ORIGIN);
  if (origin) {
    domain = origin.split('://')[1];
  } else {
    domain = req.get(HOST);
  }

  // Debug domain for now
  if (!domain) {
    debugDomain({ domain, host: req.get(HOST), origin });
  }

  const parts = domain.split('.');

  return `.${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
}

export function setCookie(req, res = defaultRes, name, value) {
  res.cookie(name, value, {
    domain: getDomain(req),
    maxAge: 7776000000,
  });
}
