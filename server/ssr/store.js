import { matchPath } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';
import find from 'lodash/find';
import get from 'lodash/get';
import set from 'lodash/set';
import routes from 'client/routes';

routes.forEach((item) => {
  const keys = [];

  const regexp = pathToRegexp(item.path, keys);

  set(item, ['regexp'], regexp);
  set(item, ['keys'], keys);
});

function decodeParam(val) {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }

  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = `Failed to decode param '${val}'`;
      err.status = err.statusCode = 400;
    }

    throw err;
  }
}

export default async function setStore(req, res, next) {
  const { pathname } = req._parsedUrl;

  const activeRoute = find(routes, (route) => matchPath(pathname, route));

  set(req, ['activeRoute'], activeRoute);

  const name = get(activeRoute, ['name']);

  if (!name) {
    next();

    return;
  }

  set(req, ['activeRouteName'], name);
  set(req, ['params'], {});

  if (get(activeRoute, ['keys', 'length'])) {
    const match = activeRoute.regexp.exec(pathname);

    const length = get(match, ['length']) || 0;

    for (let i = 1; i < length; i++) {
      const key = activeRoute.keys[i - 1];

      const prop = key.name;

      const val = decodeParam(match[i]);

      if (val !== undefined || !(hasOwnProperty.call(req.params, prop))) { // eslint-disable-line
        set(req.params, [prop], val);
      }
    }
  }

  if (!req.store) {
    set(req, ['store'], {});
  }

  next();
}
