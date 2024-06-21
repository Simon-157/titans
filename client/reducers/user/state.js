import { decode } from 'jsonwebtoken';
import set from 'lodash/set';
import { JWT } from 'defaults';
import { getCookie, setCookie } from 'client/lib/cookie';

let jwt = null;
let user = null;
if (global.__CLIENT__) {
  const jwtCookie = jwt = getCookie(JWT);
  const jwtLocalStorage = localStorage.getItem(JWT);

  // Cookie jwt has higher priority
  if (!jwt) {
    jwt = jwtLocalStorage;
  }

  if (jwt) {
    if (!jwtCookie) {
      setCookie(JWT, jwt);
    }

    localStorage.setItem(JWT, jwt);

    user = decode(jwt);

    if (user) {
      delete user.iat;
      delete user.exp;

      set(user, [JWT], jwt);
    }
  }
}

export function getInitialState() {
  return {
    user,
  };
}
