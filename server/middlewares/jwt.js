import { verify } from 'jsonwebtoken';
import dayjs from 'dayjs';
import get from 'lodash/get';
import set from 'lodash/set';
import {
  emptyFunc,
  emptyObj,
  ADMIN,
  COOKIES,
  ERR,
  HEADERS,
  IAT,
  JWT,
  ROLE,
  USER,
  USER_ID,
  WALLET,
  X_ACCESS_TOKEN,
  defaultReq,
  defaultRes,
} from 'defaults';
import { Logout, User } from 'collections';
import {
  response,
  withResponse,
} from '../util/response';
import { setCookie } from '../util/cookie';

const { JWT_SECRET_KEY } = process.env;

export async function withToken(req = emptyObj, res, next = emptyFunc) {
  try {
    const token =
      get(req, [HEADERS, X_ACCESS_TOKEN]) ||
      get(req, [COOKIES, JWT]);

    if (!token) {
      next();

      return;
    }

    const user = await verify(token, JWT_SECRET_KEY);

    const { id, iat } = user;

    const logout = await Logout.collection.findOne({
      iat,
      userId: id,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (logout) {
      throw new Error('Failed to authenticate token, please login again. Reason: logged out');
    }

    const record = await User.collection.findOne({
      _id: id,
    }, {
      projection: {
        _id: 1,
        passwordChangedAt: 1,
        role: 1,
        wallet: 1,
      },
    });

    if (!record) {
      response('Failed to authenticate token, please login again. Reason: user not found', res);

      return;
    }

    let { passwordChangedAt } = record;

    if (passwordChangedAt) {
      const issuedAt = dayjs(iat * 1000);
      passwordChangedAt = dayjs(passwordChangedAt);

      if (issuedAt.diff(passwordChangedAt) < 0) {
        response('Failed to authenticate token, please login again. Reason: password changed', res);

        return;
      }
    }

    const { role, wallet } = record;

    set(user, [ROLE], role);
    set(user, [WALLET], wallet);

    set(req, [IAT], iat);
    set(req, [JWT], token);
    set(req, [USER], user);
    set(req, [USER_ID], id);

    next();
  } catch (err) {
    set(req, [USER], {
      err,
    });

    next();
  }
}

export const withUser = withResponse(async function withUser(req, res, next) {
  await withToken(req, res);

  if (res.headersSent) {
    return;
  }

  const { userId, user } = req;

  if (!userId) {
    const token = req.headers['x-access-token'] || req.cookies.jwt;

    if (!token) {
      response('The \'x-access-token\' header or \'jwt\' cookie required', res);

      return;
    }

    response(get(user, [ERR], 'Not authorized'), res);

    return;
  }

  next();
});

export const withAdminRights = withResponse(async function withAdminRights(req, res, next) {
  await withToken(req, res);

  if (res.headersSent) {
    return;
  }

  const { userId, user } = req;

  if (!userId) {
    const token = req.headers['x-access-token'] || req.cookies.jwt;

    if (!token) {
      response('The \'x-access-token\' header or \'jwt\' cookie required', res);

      return;
    }

    response(get(user, [ERR], 'Not authorized'), res);

    return;
  }

  const { role } = user;

  if (role !== ADMIN) {
    response('403 Forbidden', res);

    return;
  }

  next();
});

export async function verifyToken(req = defaultReq, res = defaultRes) {
  const { jwt, user } = req;

  setCookie(req, res, JWT, jwt);

  response(null, res, {
    user,
  });
}

export default function addJwtMiddlewares(router) {
  router.post('/verifyToken', withUser, withResponse(verifyToken));
}
