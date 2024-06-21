import qs from 'qs';
import isFunction from 'lodash/isFunction';
import { emptyFunc, emptyObj, emptyStr, GET, JWT } from 'defaults';
import { cleanString } from 'lib/string';
import { getCookie } from 'client/lib/cookie';
import { response } from '../response';

export async function executeHttpRequest(...args) {
  const method = args[0] || GET;
  const path = args[1];
  const data = args[2] || emptyObj;
  const options = args[3] || emptyObj;
  const callback = args[4] ||
    (isFunction(args[3]) ?
      args[3] :
      (isFunction(args[2]) ? args[2] : emptyFunc)
    );

  const isPost = method.toLocaleLowerCase() !== GET;

  const headers = {};

  let jwt;
  if (!process.env.HUB_URL) {
    jwt = getCookie(JWT);
  }

  if (!jwt) {
    jwt = localStorage.getItem(JWT);

    if (jwt) {
      headers['x-access-token'] = jwt;
    }
  }

  let url = `${process.env.HUB_URL ? `//${process.env.HUB_URL}` : ''}/api/${path}`;
  if (!isPost) {
    const str = qs.stringify(data);

    if (str) {
      url += `?${str}`;
    }
  }

  let res;
  let json = emptyObj;
  let err;

  try {
    let body;
    if (data instanceof Blob) {
      body = data;

      const { name = emptyStr } = data;

      // eslint-disable-next-line no-param-reassign
      headers['X-File-Name'] = cleanString(name.split('.')[0]);
    } else {
      // eslint-disable-next-line no-param-reassign
      headers['Content-Type'] = 'application/json';

      body = data ? JSON.stringify(data) : undefined;
    }

    res = await fetch(url, {
      method,
      headers,
      body,
    });

    if (res.status >= 500) {
      err = `${url} - ${res.statusText}`;
    } else {
      json = await res.json();

      err = json.err;
    }
  } catch (error) {
    err = error;
  }

  response.handler(err, json.data, options);
  callback(err, json.data);
}
