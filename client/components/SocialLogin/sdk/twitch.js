import get from 'lodash/get';
import { emptyObj, DATA } from 'defaults';
import { randomId } from 'lib/random';
import { openCenteredPopup, rslError, timestampFromNow } from '../utils';

function load() {
  return new Promise((resolve) => {
    resolve();
  });
}

function checkLogin() {
  return new Promise((resolve, reject) => {
    reject();
  });
}

/**
* Trigger Twitch login popup
*/
function login() {
  return new Promise((resolve, reject) => {
    const { host, protocol } = location;

    const state = randomId();

    const url = `https://id.twitch.tv/oauth2/authorize?response_type=token
    &client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${protocol}//${host}&scope=user%3Aread%3Aemail&state=${state}`;

    const win = openCenteredPopup(url, 580, 880);

    if (typeof win === 'undefined') {
    // blocked by a popup blocker maybe?
      reject(rslError({
        provider: 'twitch',
        type: 'auth',
        description: 'Authentication failed',
        error: 'Authentication window blocked by the browser',
      }));

      return;
    }

    if (win.focus) {
      win.focus();
    }

    const timer = setInterval(function setInterval() {
      let closed;
      try {
      // Fix - added a second test criteria (win.closed === undefined)
      // to humour this Android quirk:
      // http://code.google.com/p/android/issues/detail?id=21061
        closed = win.closed || win.closed === undefined;
      } catch (err) {
      // For some unknown reason, IE9 (and others?) sometimes (when
      // the popup closes too quickly?) throws "SCRIPT16386: No such
      // interface supported" when trying to read 'popup.closed'. Try
      // again in 100ms.
        return;
      }

      if (closed) {
        clearInterval(timer);

        reject(rslError({
          provider: 'twitch',
          type: 'auth',
          description: 'Authentication failed',
          error: 'Authentication window closed',
        }));

        return;
      }

      let hostname;
      try {
        hostname = win.location.hostname;
      } catch (err) {
        return;
      }

      if (hostname === location.hostname) {
        clearInterval(timer);

        const fragment = new URLSearchParams(win.location.hash.slice(1));

        win.close();

        if (state !== fragment.get('state')) {
          reject(rslError({
            provider: 'twitch',
            type: 'auth',
            description: 'Authentication failed',
            error: 'State mismatch',
          }));

          return;
        }

        const accessToken = fragment.get('access_token');

        if (!accessToken) {
          reject(rslError({
            provider: 'twitch',
            type: 'auth',
            description: 'Authentication failed',
            error: 'Access token not provided',
          }));

          return;
        }

        fetch('https://api.twitch.tv/helix/users', {
          headers: {
            authorization: `Bearer ${accessToken}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID,
          },
        })
          .then((result) => result.json())
          .then((data) => {
            const response = get(data, [DATA, 0]) || emptyObj;

            const { email } = response;

            if (!email) {
              reject(rslError({
                provider: 'twitch',
                type: 'auth',
                description: 'Authentication failed',
                error: 'Email is required',
              }));

              return;
            }

            resolve({
              ...response,
              accessToken,
            });
          })
          .catch(() => {
            reject(rslError({
              provider: 'twitch',
              type: 'auth',
              description: 'Authentication failed',
              error: 'Token validation failed',
            }));
          });
      }
    }, 100);
  });
}

function logout() {
  return new Promise((resolve) => {
    resolve();
  });
}

/**
* Helper to generate user account data.
* @param {Object} response
*/
const generateUser = (response) => {
  const {
    id,
    accessToken,
    display_name: name,
    email,
    profile_image_url: profilePicURL,
  } = response;

  return {
    profile: {
      id,
      name,
      email,
      profilePicURL,
    },
    token: {
      accessToken,
      expiresAt: timestampFromNow(60000),
    },
  };
};

export default {
  checkLogin,
  generateUser,
  load,
  login,
  logout,
};
