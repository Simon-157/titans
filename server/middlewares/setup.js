import fs from 'fs';
import { join, resolve } from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
// import domain from 'domain';
import express from 'express';
import rooms from 'primus-rooms';
import size from 'lodash/size';
// import { ERROR } from 'defaults';
// import { writeLog } from '../primus/log';
// import { response } from '../util/response';
import { cwd, isDev } from '../config';
import router from '../router';

const { SSR } = process.env;

const cookieParserMiddleware = cookieParser();

export default function appSetup(app, primus, { getMarkup, setStore }) {
  app.use(compression());
  app.use(express.static('assets'));

  let fileSystem;
  let outputPath;
  let file;

  if (isDev) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../../webpack.dev.babel');

    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: 'errors-only',
    });

    fileSystem = middleware.context.outputFileSystem;
    outputPath = compiler.outputPath;

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  } else {
    fileSystem = fs;
    outputPath = resolve(cwd, 'dist');
  }

  async function allRouteHandlers(req, res) {
    if (req.headers['sec-websocket-key']) {
      return;
    }

    if (isDev) {
      try {
        file = fileSystem.readFileSync(join(outputPath, 'index.html'));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    } else {
      file = file || fileSystem.readFileSync(join(outputPath, 'index.html'));
    }

    let result = file.toString();
    if (size(req.store)) {
      result = result.replace('__STORE__={}', `__STORE__=${JSON.stringify(req.store).replace(/</g, '\\u003c')}`);
    }
    let { dynamicBody, dynamicHead } = req;
    if (SSR && !dynamicBody) {
      getMarkup({ req, res });
      dynamicBody = req.dynamicBody;
      dynamicHead = req.dynamicHead;
    }
    if (dynamicBody) {
      result = result.replace('<div id="app"></div>', dynamicBody);
    }
    if (dynamicHead) {
      result = result.replace('</head>', `${dynamicHead}</head>`);
    }

    res.send(result);
  }

  if (!isDev) { // eslint-disable-line
    const helmet = require('helmet');
    const hpp = require('hpp');

    app.use(hpp());
    app.use(helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginResourcePolicy: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }));
  }

  app.use(function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Access-Token, X-File-Name, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(bodyParser.json({
    limit: '20mb',
  }));
  app.use(bodyParser.raw({
    limit: '2mb',
    type: 'application/octet-stream',
  }));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb',
  }));

  app.use(cookieParserMiddleware);

  primus.use('cookieParser', cookieParserMiddleware);

  primus.plugin('rooms', rooms);

  app.set('trust proxy', 1);
  // app.get('/ip', (req, res) => res.send(req.ip));
  // app.use(function useDomain(req, res, next) {
  //   const d = domain.create();
  //   d.once('error', handleErrorWithDomain);
  //   d.run(next);
  // });
  app.use('/api', router);

  if (!isDev) {
    app.get('/', setStore, allRouteHandlers);
    app.get('/index.html', setStore, allRouteHandlers);
    app.use('/', express.static(outputPath));
  }

  app.get('*', setStore, allRouteHandlers);
}
