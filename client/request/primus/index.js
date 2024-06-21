import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import set from 'lodash/set';
import {
  emptyFunc,
  emptyObj,
  CLOSE,
  QUERY,
  JWT,
  RESPONSE,
  SOCKET,
} from 'defaults';
import { getCookie } from 'client/lib/cookie';
import { clearSub } from 'client/lib/sub/sub';
import { clearRequested } from 'client/request/requested';
import { response } from '../response';

let connectionString;
let protocol;
export const defaultSocket = {
  on: emptyFunc,
  send: emptyFunc,
};
let socket = defaultSocket;

if (global.__CLIENT__) {
  protocol = `ws${(process.env.HUB_URL || (location.protocol === 'https:')) ? 's' : ''}:`;

  const hostname = process.env.HUB_URL ?
    process.env.HUB_URL :
    `${(location.hostname || 'localhost')}`;

  connectionString = `${protocol}//${hostname}${process.env.NODE_ENV === 'production' ? '' : `:${process.env.PORT}`}`;
}

export function getSocket() {
  return socket;
}

export function setSocket(token) {
  if (global.__CLIENT__) {
    const Primus = require('client/primus');

    socket = new Primus(connectionString, {
      protocol,
    });

    if (token) {
      // cache function so we can remove event listener later
      socket.attachToken = function attachToken(url) {
        set(url, [QUERY], `${url.query}&token=${token}`);
      };

      socket.on('outgoing::url', socket.attachToken);
    }

    // cache function so we can remove event listener later
    socket.onResponse = function onSocketResponse(...payload) {
      response.handler(...payload);
    };

    socket.on(CLOSE, function onSocketClose() {
      clearRequested();
      clearSub();
    });
    socket.on(RESPONSE, socket.onResponse);
  }

  return socket;
}

if (global.__CLIENT__) {
  const jwt = localStorage.getItem(JWT) || getCookie(JWT);

  setSocket(jwt);
}

export function closePrimus() {
  const func = get(socket, [SOCKET, CLOSE]);

  if (isFunction(func)) {
    socket.off('outgoing::url', socket.attachToken);
    socket.off(RESPONSE, socket.onResponse);
    func.call(socket.socket);
  }

  socket = defaultSocket;
}

export function executePrimusRequest(...args) {
  if (!global.__CLIENT__) {
    return;
  }

  if (args.length < 2) {
    throw 'Too few arguments for executePrimusRequest';
  }

  const action = args[0];
  const service = args[1];
  const data = args[2] || emptyObj;
  const options = args[3] || emptyObj;
  const callback = args[4] ||
    (isFunction(args[3]) ?
      args[3] :
      (isFunction(args[2]) ? args[2] : emptyFunc)
    );

  socket.send(action, service, data, (...payload) => {
    response.handler(...payload, options);

    callback(...payload);
  });
}
