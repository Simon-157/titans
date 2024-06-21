import { ERROR } from 'defaults';
import { app, primus, server } from './app';
import { host, port } from './config';
import logger from './logger';
import setup from './middlewares/setup';
import { writeLog } from './primus/log';
import getMarkup from './ssr/markup';
import setStore from './ssr/store';
import './cron/mailQueueCronJob';

setup(app, primus, { getMarkup, setStore });

server.listen(port, host, function serverListen(err) {
  if (err) {
    logger.error(err.message);

    return;
  }

  logger.appStarted(port, (host || 'localhost'));
});

process.on('uncaughtException', function uncaughtException(err) {
  console.error('uncaughtException'); // eslint-disable-line
  console.error(err); // eslint-disable-line

  const { stack } = err;

  writeLog(null, {
    message: err,
    server: true,
    stack,
    type: ERROR,
  });
});

process.on('unhandledRejection', async function unhandledRejection(err) {
  console.error('unhandledRejection'); // eslint-disable-line
  console.error(err); // eslint-disable-line

  try {
    const { stack } = err;

    await writeLog(null, {
      message: err,
      server: true,
      stack,
      type: ERROR,
    });
  } catch (err2) {
    console.error(err2); // eslint-disable-line
  }
});
