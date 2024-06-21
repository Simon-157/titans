import { verify } from 'jsonwebtoken';
import dayjs from 'dayjs';
import get from 'lodash/get';
import set from 'lodash/set';
import {
  COOKIES,
  JWT,
  QUERY,
  REQUEST,
  ROLE,
  TOKEN,
  USER,
  USER_ID,
  WALLET,
} from 'defaults';
import { Logout, User } from 'collections';

const { JWT_SECRET_KEY = 'key' } = process.env;

export async function withToken(spark, res) {
  const token =
    get(spark, [QUERY, TOKEN]) ||
    get(spark, [REQUEST, COOKIES, JWT]);

  if (!token) {
    // const error = '401 - The \'token\' query or \'jwt\' cookie required';

    // res.status(401).send(error);

    return;
  }

  let user;
  try {
    user = await verify(token, JWT_SECRET_KEY);
  } catch (err) {
    set(spark, [USER], {
      err,
    });

    res.status(401).send(err);

    return;
  }

  const { id: userId, iat } = user;

  const logout = await Logout.collection.findOne({
    iat,
    userId,
  }, {
    projection: {
      _id: 1,
    },
  });

  if (logout) {
    res.status(403).send('403 - Failed to authenticate token, please login again. Reason: logged out');

    return;
  }

  const record = await User.collection.findOne({
    _id: userId,
  }, {
    projection: {
      _id: 1,
      role: 1,
      wallet: 1,
    },
  });

  if (!record) {
    res.status(403).send('403 - Failed to authenticate token, please login again. Reason: user not found');

    return;
  }

  const { role, wallet } = record;

  let { passwordChangedAt } = record;

  if (passwordChangedAt) {
    const issuedAt = dayjs(iat * 1000);
    passwordChangedAt = dayjs(passwordChangedAt);

    if (issuedAt.diff(passwordChangedAt) < 0) {
      res.status(403).send('403 - Failed to authenticate token, please login again. Reason: password changed');

      return;
    }
  }

  delete user.exp;
  delete user.iat;

  set(user, [ROLE], role);
  set(user, [WALLET], wallet);

  set(spark, [USER], user);
  set(spark, [USER_ID], userId);
}
