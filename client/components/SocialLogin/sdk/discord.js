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
* Trigger Discord login popup
*/
function login({ state }) {
  return new Promise((resolve, reject) => {
    const { host, protocol } = location;

    const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(protocol)}%2F%2F${encodeURIComponent(`${host}/discord-login-callback`)}&response_type=token&scope=identify%20email${state ? `&state=${state}` : ''}`;

    const win = openCenteredPopup(url, 520, 690);

    if (typeof win === 'undefined') {
      // blocked by a popup blocker maybe?
      reject(rslError({
        provider: 'discord',
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

        reject();

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

        const [accessToken, expiresIn] = [
          fragment.get('access_token'),
          fragment.get('expires_in'),
        ];

        win.close();

        if (!accessToken) {
          reject(rslError({
            provider: 'discord',
            type: 'auth',
            description: 'Authentication failed',
            error: 'Access token not provided',
          }));

          return;
        }

        fetch('https://discord.com/api/users/@me', {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
          .then((result) => result.json())
          .then((response) => {
            const { email } = response;

            if (!email) {
              reject(rslError({
                provider: 'discord',
                type: 'auth',
                description: 'Authentication failed',
                error: 'Email is required',
              }));

              return;
            }

            resolve({
              ...response,
              accessToken,
              expiresIn,
            });
          })
          .catch(() => {
            reject(rslError({
              provider: 'discord',
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
* Helper to generate user account data
* @param {Object} response
*/
const generateUser = (response) => {
  const {
    id,
    accessToken,
    avatar,
    discriminator,
    email,
    expiresIn,
    username,
  } = response;

  return {
    profile: {
      id,
      discriminator,
      name: username,
      email,
      profilePicURL: `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`,
    },
    token: {
      accessToken,
      expiresAt: timestampFromNow(expiresIn),
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
