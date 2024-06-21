import dayjs from 'dayjs';
import { LOCALHOST, MONTH, PRODUCTION } from 'defaults';

export function getCookie(name) {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }

  return null;
}

function getDomain() {
  if (process.env.NODE_ENV !== PRODUCTION) {
    return LOCALHOST;
  }

  const { origin } = location;

  let domain;

  if (origin) {
    // eslint-disable-next-line prefer-destructuring
    domain = origin.split('://')[1];
  } else {
    domain = location.hostname;
  }

  const parts = domain.split('.');

  return `.${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
}

export function setCookie(name, value) {
  document.cookie = `${name}=${value};expires=${dayjs().add(3, MONTH).format('ddd, DD MMM YYYY HH:mm:ss')};path=/;domain=${getDomain()};`;
}

export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=${getDomain()};`;
}
