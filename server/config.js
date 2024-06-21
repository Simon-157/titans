const argv = require('minimist')(process.argv.slice(2));
const cwd = process.cwd();
const isDev = process.env.NODE_ENV !== 'production';
const host = argv.host || process.env.HOST;
const port = argv.port || process.env.PORT;
// const tunnel = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel;

const db = {
  host: process.env.MONGO_INITDB_HOST || 'localhost',
  database: process.env.MONGO_INITDB_DATABASE || 'cryptotitans',
  port: process.env.MONGO_INITDB_PORT || 27017,
};

module.exports.cwd = cwd;
module.exports.db = db;
module.exports.host = host;
module.exports.isDev = isDev;
module.exports.port = port;
// module.exports.tunnel = tunnel;

exports = {
  cwd,
  db,
  host,
  isDev,
  port,
  // tunnel,
};
