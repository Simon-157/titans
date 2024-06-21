import UAParser from 'ua-parser-js';
import get from 'lodash/get';
import { emptyObj, emptyStr, HEADERS, USER_ID } from 'defaults';
import { Log } from 'collections';
import { handleError } from 'lib/error';

const parser = new UAParser();

export async function writeLog(req, data = emptyObj) {
  const userId = get(req, [USER_ID]);

  const { server = false, stack = emptyStr, ...rest } = data;

  let { message = emptyStr } = data;

  if (message) {
    message = handleError(message);
  }

  let userAgent;
  if (!server) {
    userAgent = get(req, [HEADERS, 'user-agent']);

    if (userAgent) {
      parser.setUA(userAgent);
      userAgent = parser.getResult();
    }
  }

  await Log.create({
    ...rest,
    date: new Date(),
    message: message.substr(0, 1024),
    server,
    stack: stack.substr(0, 1024),
    userAgent,
    userId,
  });
}
