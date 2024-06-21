import { ERROR, defaultReq, defaultRes } from 'defaults';
import { handleError } from 'lib/error';
import { writeLog } from '../../primus/log';

export function response(err, res = defaultRes, data) {
  const result = {
    err: err ? handleError(err) : undefined,
    data: data || undefined,
  };

  let status = err ? (err.status || parseInt(err, 10)) : 200;

  // Status 500 does not return error info back to client, replace with 400
  if (status >= 500 || isNaN(status)) {
    status = 400;
  }

  res.status(status);
  res.send(result);
}

export function withResponse(func) {
  return async function wrappedWithResponse(req = defaultReq, res = defaultRes, next) {
    try {
      await func(req, res, next);
    } catch (err) {
      let status = err.status || parseInt(err, 10);

      if (isNaN(status)) {
        status = 500;
      }

      if (status >= 500) {
        const { stack } = err;

        const { pathname } = req._parsedUrl;

        writeLog(req, {
          message: err,
          pathname,
          server: true,
          stack,
          type: ERROR,
        });
      }

      if (res.headersSent || res._headersSent) {
        return;
      }

      // Status 500 does not return error info back to client, replace with 400
      res.status(400).send({
        err: handleError(err),
      });
    }
  };
}
