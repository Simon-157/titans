import axios from 'axios';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { OAuth2Client } from 'google-auth-library';
import { decode, sign } from 'jsonwebtoken';
import pako from 'pako';
import shajs from 'sha.js';
import get from 'lodash/get';
import identity from 'lodash/identity';
import isString from 'lodash/isString';
import pickBy from 'lodash/pickBy';
import set from 'lodash/set';
import trim from 'lodash/trim';
import {
  emptyFunc,
  emptyObj,
  BODY,
  DATA,
  EMAIL,
  HOST,
  INTERNAL,
  JWT,
  ORIGIN,
  PASSWORD,
  STRING,
  USER,
  YEARS,
  defaultReq,
} from 'defaults';
import { randomId, secret as secretString } from 'lib/random';
import { User } from 'collections';
// import { generateUserCharacters } from '../lib/character';
import {
  sendEmail,
  sendRegistrationEmail,
} from '../lib/email';
import encryptor from '../lib/encryptor';
import { assignLootboxes } from '../lib/lootbox';
// import { changeTitanium } from '../lib/titanium';
import {
  checkForName,
  isValidUsername,
  isValidPassword,
} from '../lib/user';
import { setCookie } from '../util/cookie';
import { delay } from '../util/delay';
import { getClientIpAddress } from '../util/ip';
import {
  response,
  withResponse,
} from '../util/response';
import { getLangByCountry, t } from '../templates';

const googleAuthClient = new OAuth2Client();

const {
  FACEBOOK_APPTOKEN,
  FACEBOOK_CLIENTID,
  GOOGLE_CAPTCHA_SECRET,
  GOOGLE_CLIENTID,
  HOSTNAME,
  JWT_SECRET_KEY = 'key',
  TOKEN_MAX_LIFETIME_MINUTES = 129600,
  TWITCH_CLIENT_ID,
} = process.env;

function getOrigin(req) {
  let hostname = req.headers['x-proxyuser-hostname'] ||
    req.headers['x-original-host'] ||
    req.headers.host;

  if (!hostname) {
    return null;
  }

  [hostname] = hostname.split(':');

  return hostname;
}

export async function isValidToken(accessToken, provider) {
  let headers;
  let tokenUrl;
  switch (provider) {
    case 'Discord':
      headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      tokenUrl = 'https://discord.com/api/users/@me';

      break;
    case 'Facebook':
      tokenUrl = `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${FACEBOOK_APPTOKEN}`;

      break;
    case 'Twitch':
      headers = {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': TWITCH_CLIENT_ID,
      };
      tokenUrl = 'https://api.twitch.tv/helix/users';

      break;
    case 'Google':
    default:
      tokenUrl = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
  }

  let tokenInfo;
  if (provider === 'Google') {
    const ticket = await googleAuthClient.verifyIdToken({
      idToken: accessToken,
      audience: GOOGLE_CLIENTID,
    });

    tokenInfo = {
      data: {
        issued_to: ticket.payload.aud,
      },
    };
  } else {
    tokenInfo = await axios.get(tokenUrl, { headers });
  }

  switch (provider) {
    case 'Discord':
      if (tokenInfo.status !== 200) {
        return 'Discord accessToken is not valid';
      }

      break;
    case 'Facebook':
      if (get(tokenInfo, [DATA, DATA, 'app_id']) !== `${FACEBOOK_CLIENTID}`) {
        return 'Facebook accessToken is not valid';
      }

      break;
    case 'Twitch':
      if (!get(tokenInfo, ['data', 'data', 0, 'id'])) {
        return 'Twitch accessToken is not valid';
      }

      break;
    case 'Google':
    default:
      if (GOOGLE_CLIENTID !== get(tokenInfo, [DATA, 'issued_to'])) {
        return 'Google accessToken is not valid';
      }
  }

  return true;
}

export async function checkUsername(req = defaultReq, res) {
  let { username } = get(req, [BODY], emptyObj);

  if (!username) {
    response('The \'username\' field is required', res);

    return;
  }

  username = username.replace(/[^0-9a-zA-Z_]/g, '');

  const login = username.toLocaleLowerCase();

  const user = await User.collection.findOne({
    login,
  }, {
    projection: {
      _id: 1,
    },
  });

  if (user) {
    response('Username already exists', res);

    return;
  }

  response(null, res, 1);
}

export async function confirmEmail(req = defaultReq, res) {
  const { encodedId } = get(req, [BODY], emptyObj);

  if (!encodedId) {
    response('The \'encodedId\' field is required', res);

    return;
  }

  const _id = encryptor.decrypt(decodeURIComponent(encodedId).replace(/_/g, '/'));

  const user = await User.collection.findOne({
    _id,
  }, {
    projection: {
      _id: 1,
      role: 1,
      username: 1,
      verified: 1,
    },
  });

  if (!user) {
    await delay(200); // delay requests on purpose to decrease bruteforce

    response('User not found', res);

    return;
  }

  const { role, username, verified } = user;

  if (req.userId && (req.userId !== _id)) {
    response('Can\'t confirm email for another user', res);

    return;
  }

  if (!verified) {
    await User.collection.updateOne({
      _id,
    }, {
      $set: {
        lastLogin: new Date(),
        verified: Boolean(verified),
      },
      $addToSet: {
        ip: getClientIpAddress(req),
        origin: getOrigin(req),
      },
    });
  }

  const jwt = sign(
    {
      id: _id,
      role,
      username,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: `${TOKEN_MAX_LIFETIME_MINUTES} minutes`,
    },
  );

  setCookie(req, res, JWT, jwt);

  response(null, res, {
    user: {
      id: _id,
      jwt,
      role,
      username,
    },
  });

  // generateUserCharacters({ id: _id });
  // changeTitanium({
  //   amount: 1000000,
  //   identifier: 'init',
  //   reason: 'grant',
  //   userId: user.id,
  // });
}

export async function forgotPassword(req = defaultReq, res) {
  const data = get(req, [BODY], emptyObj);

  let { email } = data;

  email = trim(email).toLocaleLowerCase();

  if (!email) {
    response('The \'email\' field is required', res);

    return;
  }

  const user = await User.collection.findOne({
    email,
  }, {
    projection: {
      _id: 1,
      country: 1,
      token: 1,
      username: 1,
    },
  });

  if (!user) {
    await delay(200); // delay requests on purpose to decrease bruteforce

    response('User with such email not found', res);

    return;
  }

  const { _id, country, token, username } = user;

  const passwordResetToken = token || secretString();

  if (token !== passwordResetToken) {
    await User.collection.updateOne({
      _id,
    }, {
      $set: {
        token: passwordResetToken,
      },
    });
  }

  const lang = getLangByCountry(country);

  await sendEmail(email, {
    headerText: t(['hi'], lang, { username }),
    bodyTextBlock1: t(['forgotText'], lang),
    buttonText: t(['forgotBtn'], lang),
    buttonUrl: `https://${HOSTNAME}/passwordreset/${passwordResetToken}`,
    subject: t(['forgotSubject'], lang),
  });

  const { internal } = data;

  if (!internal) {
    response(null, res, 1);
  }
}

export async function resetPassword(req = defaultReq, res) {
  const data = get(req, [BODY], emptyObj);

  const { inflate, token } = data;

  if (!token) {
    response('The \'token\' field is required', res);

    return;
  }

  const user = await User.collection.findOne({
    token,
  }, {
    projection: {
      _id: 1,
      password: 1,
      role: 1,
      username: 1,
    },
  });

  if (!user) {
    await delay(200); // delay requests on purpose to decrease bruteforce

    response('Invalid token', res);

    return;
  }

  let { password } = data;

  if (inflate) {
    try {
      password = pako.inflate(password, { to: STRING });
    } catch (err) {
      response(err, res);

      return;
    }
  }

  const isValidPass = isValidPassword(password);
  if (isValidPass !== true) {
    response(isValidPass, res);

    return;
  }

  const { _id, password: existingPassword, role, username } = user;

  const $set = {
    lastLogin: new Date(),
    token: null,
  };

  password = shajs('sha256')
    .update(password)
    .digest('hex');

  let match;
  if (existingPassword) {
    match = await bcrypt.compare(password, existingPassword);
  }

  const jwt = sign(
    {
      id: _id,
      role,
      username,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: `${TOKEN_MAX_LIFETIME_MINUTES} minutes`,
    },
  );

  setCookie(req, res, JWT, jwt);

  if (!match) {
    const decoded = decode(jwt);

    const { iat } = decoded;

    $set.password = await bcrypt.hash(password, 10);
    $set.passwordChangedAt = new Date(iat * 1000);
  }

  await User.collection.updateOne({
    _id,
  }, {
    $set,
    $addToSet: {
      ip: getClientIpAddress(req),
      origin: getOrigin(req),
    },
  });

  response(null, res, {
    user: {
      id: _id,
      jwt,
      role,
      username,
    },
  });

  // generateUserCharacters({ id: _id });
  // changeTitanium({
  //   amount: 1000000,
  //   identifier: 'init',
  //   reason: 'grant',
  //   userId: user.id,
  // });
}

const providers = ['Discord', 'Google', 'Facebook', 'Twitch'];

const providerFields = {
  Discord: 'discordId',
  Facebook: 'facebookId',
  Google: 'googleId',
  Twitch: 'twitchId',
};

export async function registerFunc(req = {
  get: emptyFunc,
}, res) {
  const data = pickBy(req.body, identity);

  const { allowEmail, country, inflate, provider, verified } = data;

  let { _id, email, password, username } = data;

  if (!username) {
    response('The \'username\' field is required', res);

    return;
  }

  username = username.replace(/[^0-9a-zA-Z_]/g, '');

  if (provider) {
    username = username.substring(0, 15);
  }

  const { fromImport, password: hashedPassword } = req;

  if (!fromImport) {
    const isValid = isValidUsername(username);
    if (isValid !== true) {
      response(isString(isValid) ? isValid : 'Wrong Username Format', res);

      return;
    }

    const { birthDate } = data;

    if (birthDate) {
      const hasValidBirthDate = dayjs(birthDate) < dayjs().subtract(16, YEARS);

      if (!hasValidBirthDate) {
        response('error.nonValidBirthDate', res);

        return;
      }
    }
  }

  const origin = req.get(ORIGIN) || req.get(HOST);

  const login = username.toLocaleLowerCase();

  email = trim(email).toLocaleLowerCase();

  const user = {
    ...data,
    email,
    login,
    ip: getClientIpAddress(req),
    origin,
    username,
  };

  if (fromImport || !provider) {
    if (!fromImport) {
      const emailRegexp = /\S+@\S+/g;

      if (!emailRegexp.test(email)) {
        response('error.nonValidEmail', res);

        return;
      }

      if (inflate) {
        try {
          password = pako.inflate(password, { to: STRING });
        } catch (err) {
          response(err, res);

          return;
        }
      }

      const isValidPass = isValidPassword(password);
      if (isValidPass !== true) {
        response(isValidPass, res);

        return;
      }
    }

    const alreadyExists = await User.collection.findOne({
      login,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (alreadyExists) {
      response('Username already exists', res);

      return;
    }

    const emailAlreadyExists = await User.collection.findOne({
      email,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (emailAlreadyExists) {
      response('E-mail address already in use', res);

      return;
    }
  }

  if (fromImport) {
    const {
      createdAt,
      discordId,
      facebookId,
      googleId,
      passwordChangedAt,
      twitchId,
    } = req.body;

    user.createdAt = createdAt;
    user.discordId = discordId;
    user.facebookId = facebookId;
    user.googleId = googleId;
    user.password = hashedPassword;
    user.passwordChangedAt = passwordChangedAt;
    user.twitchId = twitchId;
  }

  let createdUser;
  // social register
  if (!fromImport && provider) {
    if (providers.indexOf(provider) === -1) {
      response('Incorrect \'provider\' field', res);

      return;
    }

    const { accessToken, accountId } = data;

    if (!accessToken) {
      response('The \'accessToken\' field is required', res);

      return;
    }

    if (!accountId) {
      response('The \'accountId\' field is required', res);

      return;
    }

    const valid = await isValidToken(accessToken, provider);

    if (valid !== true) {
      await delay(200); // delay requests on purpose to decrease bruteforce

      response(valid, res);

      return;
    }

    const providerField = providerFields[provider];

    // note: email might be empty
    if (!email) {
      response('Please share your e-mail address', res);

      return;
    }

    if (email) {
      const exists = await User.collection.findOne({
        $or: [{
          _id,
        }, {
          email,
        }],
      }, {
        projection: {
          _id: 1,
          discord: 1,
          role: 1,
        },
      });

      if (exists) {
        const $set = {
          [providerField]: accountId,
          lastLogin: new Date(),
        };

        if (provider === 'Discord') {
          const discord = `${data.username}#${data.discriminator}`;

          if (discord !== exists.discord) {
            $set.discord = discord;
          }

          assignLootboxes({
            _id: exists._id,
            discordId: accountId,
          });
        }

        // link social account for existing user
        await User.collection.updateOne({
          _id: exists._id,
        }, {
          $set,
          $addToSet: {
            ip: getClientIpAddress(req),
            origin: getOrigin(req),
          },
        });

        const jwt = sign(
          {
            id: exists._id,
            role: exists.role,
            username,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: `${TOKEN_MAX_LIFETIME_MINUTES} minutes`,
          },
        );

        setCookie(req, res, JWT, jwt);

        response(null, res, {
          user: {
            id: exists._id,
            jwt,
            role: exists.role,
            username,
          },
        });

        // generateUserCharacters({ id: exists._id });
        // changeTitanium({
        //   amount: 1000000,
        //   identifier: 'init',
        //   reason: 'grant',
        //   userId: user.id,
        // });

        return;
      }
    }

    username = user.username = await checkForName(username);
    user.login = username.toLocaleLowerCase();

    user[providerField] = accountId;

    _id = _id || randomId();

    if (provider === 'Discord') {
      const discord = `${data.username}#${data.discriminator}`;

      user.discord = discord;

      assignLootboxes({
        _id,
        discordId: accountId,
      });
    }

    createdUser = await User.create({
      ...user,
      _id,
      active: true,
      allowEmail,
      allowPromo: allowEmail,
      lastLogin: new Date(),
    });
  } else {
    if (!fromImport) {
      password = shajs('sha256')
        .update(password)
        .digest('hex');
    }

    const record = {
      ...user,
      _id: _id || randomId(),
      active: true,
      allowEmail,
      allowPromo: allowEmail,
      password: hashedPassword ||
        (password ? await bcrypt.hash(password, 10) : null),
    };

    if (!fromImport) {
      record.lastLogin = new Date();
    }

    createdUser = await User.create(record);
  }

  _id = createdUser._id;

  const jwt = sign(
    {
      id: _id,
      role: USER,
      username,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: `${TOKEN_MAX_LIFETIME_MINUTES} minutes`,
    },
  );

  setCookie(req, res, JWT, jwt);

  response(null, res, {
    user: {
      id: _id,
      jwt,
      role: USER,
      username,
    },
  });

  if (!fromImport && !verified) {
    sendRegistrationEmail(createdUser, country);
  }

  // generateUserCharacters({ id: _id });
  // changeTitanium({
  //   amount: 1000000,
  //   identifier: 'init',
  //   reason: 'grant',
  //   userId: user.id,
  // });
}

export async function importFunc(req = defaultReq, res) {
  const { password, secret } = req.body;

  if (secret !== JWT_SECRET_KEY) {
    response('Forbidden', res);

    return;
  }

  delete req.body.secret;

  set(req, ['fromImport'], true);
  set(req, [PASSWORD], password);

  delete req.body.password;

  await registerFunc(req, res);
}

export async function loginFunc(req = defaultReq, res) {
  const data = get(req, [BODY], emptyObj);

  const { provider } = data;

  const $set = {};

  let user;
  if (provider) {
    if (providers.indexOf(provider) === -1) {
      response('Incorrect \'provider\' field', res);

      return;
    }

    const { accessToken, accountId, register } = data;

    if (!accessToken) {
      response('The \'accessToken\' field is required', res);

      return;
    }

    if (!accountId) {
      response('The \'accountId\' field is required', res);

      return;
    }

    const valid = await isValidToken(accessToken, provider);

    if (valid !== true) {
      response(valid, res);

      return;
    }

    const providerField = providerFields[provider];

    user = await User.collection.findOne({
      [providerField]: accountId,
    }, {
      projection: {
        _id: 1,
        discord: 1,
        role: 1,
        username: 1,
      },
    });

    if (!user) {
      if (!provider) {
        // do not allow to register without existing account and without birthDate and country

        const { birthDate, country } = data;

        if (!birthDate) {
          response('The \'birthDate\' field is required', res);

          return;
        }

        if (!country) {
          response('The \'country\' field is required', res);

          return;
        }
      }

      let { email } = data;

      // note: email might be empty
      if (email) {
        email = email.toLocaleLowerCase();

        user = await User.collection.findOne({
          email,
        }, {
          projection: {
            _id: 1,
            discord: 1,
            role: 1,
            username: 1,
          },
        });
      }

      if (!user) {
        if (register) {
          await registerFunc(req, res);

          return;
        }

        response('Social user not found. Please register', res);

        return;
      }

      // link social account for existing user
      $set[providerField] = accountId;
    }
  } else {
    let { login, password } = data;

    if (!login) {
      response('The \'login\' field is required', res);

      return;
    }

    if (!password) {
      response('The \'password\' field is required', res);

      return;
    }

    if (GOOGLE_CAPTCHA_SECRET) { // eslint-disable-line
      const { external, recaptcha } = data;

      if (!external) {
        const googleResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_CAPTCHA_SECRET}&response=${recaptcha}`);

        const { data: googleResponseData } = googleResponse;

        // // eslint-disable-next-line
        // console.log('Debug captcha');
        // // eslint-disable-next-line
        // console.log(data);
        // // eslint-disable-next-line
        // console.log(recaptcha);
        // // eslint-disable-next-line
        // console.log(googleResponseData);

        if (!googleResponseData.success) {
          await delay(200); // delay requests on purpose to decrease bruteforce

          response('Captcha verification failed', res);

          return;
        }
      }
    }

    login = trim(login).toLocaleLowerCase();

    user = await User.collection.findOne({
      $or: [
        {
          login,
        },
        {
          email: login,
        },
      ],
    }, {
      projection: {
        _id: 1,
        active: 1,
        discord: 1,
        email: 1,
        password: 1,
        role: 1,
        username: 1,
      },
    });

    if (!user) {
      await delay(200); // delay requests on purpose to decrease bruteforce

      response('Incorrect login or password', res);

      return;
    }

    const { inflate } = data;

    if (inflate) {
      try {
        password = pako.inflate(password, { to: STRING });
      } catch (err) {
        response(err, res);

        return;
      }
    }

    const existingPassword = user.password;

    if (!existingPassword) {
      const { email } = user;

      if (!email) {
        response('general.error.emailNotFound', res);

        return;
      }

      set(req, [BODY, EMAIL], email);
      set(req, [BODY, INTERNAL], true);

      await forgotPassword(req, res);

      response('general.error.checkEmail', res);

      return;
    }

    password = shajs('sha256')
      .update(password)
      .digest('hex');

    const match = await bcrypt.compare(password, existingPassword);

    if (!match) {
      await delay(200); // delay requests on purpose to decrease bruteforce

      response('Incorrect login or password', res);

      return;
    }

    if (!user.active) {
      response('Account is not active', res);

      return;
    }
  }

  const { _id, role, username } = user;

  $set.lastLogin = new Date();

  if (provider === 'Discord') {
    const discord = `${data.username}#${data.discriminator}`;

    if (discord !== user.discord) {
      $set.discord = discord;
    }

    assignLootboxes({
      _id,
      discordId: data.accountId,
    });

    global.updateSub([`userAccounts?userId=${_id}`]);
  }

  await User.collection.updateOne({ _id }, {
    $set,
    $addToSet: {
      ip: getClientIpAddress(req),
      origin: getOrigin(req),
    },
  });

  const jwt = sign(
    {
      id: _id,
      role,
      username,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: `${TOKEN_MAX_LIFETIME_MINUTES} minutes`,
    },
  );

  setCookie(req, res, JWT, jwt);

  response(null, res, {
    user: {
      id: _id,
      jwt,
      role,
      username,
    },
  });

  // generateUserCharacters({ id: _id });
  // changeTitanium({
  //   amount: 1000000,
  //   identifier: 'init',
  //   reason: 'grant',
  //   userId: user.id,
  // });
}

export default function addSsoMiddlewares(router) {
  router.post('/checkUsername', withResponse(checkUsername));
  router.post('/confirmEmail', withResponse(confirmEmail));
  router.post('/forgotPassword', withResponse(forgotPassword));
  router.post('/import', withResponse(importFunc));
  router.post('/login', withResponse(loginFunc));
  router.post('/resetPassword', withResponse(resetPassword));
  router.post('/register', withResponse(registerFunc));
}
