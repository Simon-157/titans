import request from 'request';
import pify from 'pify';
import setCookie from 'set-cookie-parser';
import _get from 'lodash/get';
import identity from 'lodash/identity';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import { BODY, ERR, ERROR, HOST, LOCALHOST, ORIGIN, PASSWORD } from 'defaults';
import { handleError } from 'lib/error';
import { isDev } from '../config';
import { writeLog } from '../primus/log';
import { getClientIpAddress } from './ip';

const getPromisified = pify(request.get);
const postPromisified = pify(request.post);

export async function get(url, options = {}) {
  try {
    const { headers, req } = options;

    const response = await getPromisified(url, {
      headers: {
        ...headers,
        'x-proxyuser-hostname': req ?
          req.headers['x-original-host'] || req.headers.host :
          null,
        'x-proxyuser-ip': getClientIpAddress(req),
      },
    });

    const { statusCode, statusMessage } = response;

    let data;
    const msg = _get(response, [BODY], '');
    try {
      data = JSON.parse(msg);
    } catch (err) {
      if (msg) {
        data = {
          err: msg,
        };
      } else {
        data = {
          err: `${statusCode} ${statusMessage}`,
        };
      }
    }

    if (statusCode >= 500) {
      const message = _get(data, [ERR]);

      writeLog(null, {
        message,
        pathname: url,
        server: true,
        type: ERROR,
      });
    }

    return data;
  } catch (err) {
    return { err: handleError(err) };
  }
}

function getDomain(req) {
  if (isDev) {
    return LOCALHOST;
  }

  const origin = req.get(ORIGIN);

  let domain;

  if (origin) {
    // eslint-disable-next-line prefer-destructuring
    domain = origin.split('://')[1];
  } else {
    domain = req.get(HOST);
  }

  const parts = domain.split('.');

  return `.${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
}

export async function post(url, form = {}, options = form) {
  try {
    const { req, res, headers, logging = true } = options;

    const response = await postPromisified(url, {
      form: pickBy(form, identity),
      headers: {
        ...headers,
        'x-proxyuser-hostname': req ?
          req.headers['x-original-host'] || req.headers.host :
          null,
        'x-proxyuser-ip': getClientIpAddress(req),
      },
    });

    const { statusCode, statusMessage } = response;

    let data;
    const msg = _get(response, [BODY], '');
    try {
      data = JSON.parse(msg);
    } catch (err) {
      if (msg) {
        data = {
          err: msg,
        };
      } else {
        data = {
          err: `${statusCode} ${statusMessage}`,
        };
      }
    }

    if (statusCode >= 500 && logging) {
      const message = _get(data, [ERR]);

      writeLog(null, {
        data: omit(pickBy(form, identity), ['accessToken', PASSWORD]),
        message,
        pathname: url,
        server: true,
        type: ERROR,
      });
    }

    if (req && res) {
      const parsed = setCookie.parse(response);

      let parsedLength = parsed.length;
      if (parsedLength !== 0) {
        const domain = getDomain(req);

        while (parsedLength-- > 0) {
          const cookie = parsed[parsedLength];

          const { name, value, maxAge } = cookie;

          const opts = {
            domain,
            maxAge,
          };

          res.cookie(name, value, opts);
        }
      }
    }

    return data;
  } catch (err) {
    return { err: handleError(err) };
  }
}

export default {
  get,
  post,
};
