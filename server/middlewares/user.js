import bcrypt from 'bcrypt';
import pako from 'pako';
import shajs from 'sha.js';
import identity from 'lodash/identity';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import pickBy from 'lodash/pickBy';
import size from 'lodash/size';
import { emptyArr, JWT, STRING, defaultReq } from 'defaults';
import { Logout, User } from 'collections';
import { SignedMessage } from 'lib/wallet';
import { isValidPassword, isValidUsername } from 'server/lib/user';
import { response, withResponse } from 'server/util/response';
import { setCookie } from 'server/util/cookie';
import { assignLootboxes } from '../lib/lootbox';
import { delay } from '../util/delay';
import { withUser } from './jwt';
import { isValidToken } from './sso';

const { AZURE_STORAGE_URL } = process.env;

export async function getUser(req = defaultReq, res) {
  const { userId } = req;

  const record = await User.collection.findOne({
    _id: userId,
    active: true,
  }, {
    projection: {
      _id: 1,
      allowEmail: 1,
      allowPromo: 1,
      birthDate: 1,
      country: 1,
      discord: 1,
      discordId: 1,
      email: 1,
      profilePicture: 1,
      username: 1,
      wallet: 1,
    },
  });

  record.id = userId;

  response(null, res, {
    user: record,
  });
}

export async function editUser(req = defaultReq, res) {
  const { body, userId } = req;

  const { allowEmail, allowPromo } = body;

  const data = pickBy(body, identity);
  data.allowEmail = allowEmail;
  data.allowPromo = allowPromo;

  const record = await User.collection.findOne({
    _id: userId,
  }, {
    projection: {
      _id: 1,
      discord: 1,
      discordId: 1,
      email: 1,
      password: 1,
      username: 1,
      wallet: 1,
    },
  });

  if (!record) {
    response('User not found', res);

    return;
  }

  const {
    birthDate,
    city,
    country,
    description,
    discordId,
    email,
    firstName,
    gender,
    inflate,
    lastName,
    phoneNumber,
    postalCode,
    profilePicture,
    wallet,
  } = data;

  let { password, username } = data;

  if (password) {
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

  // email = trim(email).toLocaleLowerCase();
  //
  // if (email) {
  //   const emailRegexp = /\S+@\S+/g;
  //
  //   if (!emailRegexp.test(email)) {
  //     response('Please provide a valid e-mail address', res);
  //
  //     return;
  //   }
  // }

  const $set = {};
  const $addToSet = {};

  let updatePublicUser;

  if (username) {
    username = username.replace(/[^0-9a-zA-Z_]/g, '');

    if (username !== record.username) {
      const isValid = isValidUsername(username);
      if (isValid !== true) {
        response(isString(isValid) ? isValid : 'Wrong Username Format', res);

        return;
      }

      const login = $set.login = username.toLocaleLowerCase();

      const exists = await User.collection.findOne({
        _id: {
          $ne: userId,
        },
        login,
      }, {
        projection: {
          _id: 1,
        },
      });

      if (exists) {
        response('Username already taken', res);

        return;
      }

      $set.username = username;

      updatePublicUser = true;
    }
  }

  if (email && !record.email) {
    const exists = await User.collection.findOne({
      _id: {
        $ne: userId,
      },
      email,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (exists) {
      response('Email already taken', res);

      return;
    }

    $set.email = email;
  }

  const subs = [];

  if (!isNil(allowEmail)) {
    $set.allowEmail = allowEmail;
  }

  if (!isNil(allowPromo)) {
    $set.allowPromo = allowPromo;
  }

  if (birthDate) {
    $set.birthDate = birthDate;
  }

  if (city) {
    $set.city = city;
  }

  if (country) {
    $set.country = country;
  }

  if (description) {
    $set.description = description;
  }

  if (discordId && discordId !== record.discordId) {
    const valid = await isValidToken(data.accessToken, 'Discord');

    if (valid !== true) {
      await delay(200); // delay requests on purpose to decrease bruteforce

      response(valid, res);

      return;
    }

    $set.discordId = discordId;

    const discord = `${data.name}#${data.discriminator}`;

    if (discord !== record.discord) {
      $set.discord = discord;
    }

    assignLootboxes({
      _id: userId,
      discordId,
    });

    subs.push(`userAccounts?userId=${userId}`);
  }

  if (firstName) {
    $set.firstName = firstName;
  }

  if (gender) {
    $set.gender = gender;
  }

  if (lastName) {
    $set.lastName = lastName;
  }

  if (phoneNumber) {
    $set.phoneNumber = phoneNumber;
  }

  if (postalCode) {
    $set.postalCode = postalCode;
  }

  if (profilePicture) {
    if (profilePicture.indexOf(AZURE_STORAGE_URL) === 0) {
      $set.profilePicture = profilePicture;

      updatePublicUser = true;
    }
  }

  if (password) {
    password = shajs('sha256')
      .update(password)
      .digest('hex');

    const { password: existingPassword } = record;

    let match;
    if (existingPassword) {
      match = await bcrypt.compare(password, existingPassword);
    }

    if (!match) {
      $set.password = await bcrypt.hash(password, 10);
      $set.passwordChangedAt = new Date();
    }
  }

  if (wallet) {
    const { message, signature } = data;

    if (wallet !== message.publicKey) {
      response('Wallet does not match', res);

      return;
    }

    const signedMessage = new SignedMessage(message);

    const isValidMessage = await signedMessage.validate(signature);

    if (!isValidMessage) {
      response('Wallet validation failed', res);

      return;
    }

    const existingWallet = await User.collection.findOne({
      _id: {
        $ne: userId,
      },
      wallet,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (existingWallet) {
      response('Wallet already connected', res);

      return;
    }

    $addToSet.wallet = wallet;
  }

  const hasSet = size($set) !== 0;
  const hasAddToSet = size($addToSet) !== 0;
  if (hasSet || hasAddToSet) {
    const action = {};

    if (hasSet) {
      action.$set = $set;
    }

    if (hasAddToSet) {
      action.$addToSet = $addToSet;
    }

    await User.collection.updateOne({
      _id: userId,
    }, action);
  }

  if (updatePublicUser) {
    subs.push(`publicUser?userId=${userId}`);
  }

  if (subs.length !== 0) {
    global.updateSub(subs);
  }

  const result = pickBy({
    id: userId,
    allowEmail,
    allowPromo,
    birthDate,
    city,
    country,
    description,
    email: record.email || email,
    firstName,
    gender,
    lastName,
    phoneNumber,
    postalCode,
    profilePicture,
    username,
  }, identity);
  result.allowEmail = body.allowEmail;
  result.allowPromo = body.allowPromo;
  result.wallet = wallet ?
    [...(record.wallet ? record.wallet : emptyArr), wallet] :
    record.wallet;

  response(null, res, result);
}

export async function logout(req = defaultReq, res) {
  const { iat, userId } = req;

  const data = {
    iat,
    userId,
  };

  await Logout.create(data);

  setCookie(req, res, JWT, '');

  response(null, res, data);
}

export default function addUserMiddlewares(router) {
  router.get('/getUser', withUser, withResponse(getUser));
  router.post('/editUser', withUser, withResponse(editUser));
  router.post('/logout', withUser, withResponse(logout));
}
