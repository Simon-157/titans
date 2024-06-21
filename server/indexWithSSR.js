require('core-js');
const { resolve } = require('path');
const { getHeapStatistics } = require('v8');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const utc = require('dayjs/plugin/utc');
const dotenv = require('dotenv');
const round = require('lodash/round');

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const cwd = process.cwd();

const nodeEnv = process.env.NODE_ENV || 'development';

const totalHeapSize = getHeapStatistics().total_available_size;
const totalHeapSizeGb = round((totalHeapSize / 1024 / 1024 / 1024), 2);

// eslint-disable-next-line no-console
console.log('totalHeapSizeGb: ', totalHeapSizeGb);

dotenv.config({
  path: resolve(cwd, './settings/.env'),
});

dotenv.config({
  path: resolve(cwd, `./settings/.env.${nodeEnv}`),
});

require('./connectWithSSR');
