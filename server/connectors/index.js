import Mongo from 'mongoose';
import { db } from '../config';

const { MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_ROOT_USERNAME } = process.env;

Mongo.Promise = global.Promise;

export default function connect(connectCb) {
  const { database, host, port } = db;

  const options = {
    keepAlive: 120,
    poolSize: 50,
    retryWrites: false,
    socketTimeoutMS: 30000,
    sslValidate: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const user = MONGO_INITDB_ROOT_USERNAME;
  const pass = MONGO_INITDB_ROOT_PASSWORD;

  let userString = '';

  if (user && pass) {
    options.user = user;
    options.pass = pass;

    userString = user && pass ? `${user}:${pass}@` : '';
    options.ssl = true;
  }

  const connString = `mongodb://${userString}${host}:${port}/${database}`;

  console.log(`=> Connecting to db ${database} at ${host}:${port}...`); // eslint-disable-line

  Mongo.connect(connString, options, function mongoConnect(err) {
    if (err) {
      console.log(`===>>> !!! Could not connect to MongoDB on port ${port} !!! <<<===`); // eslint-disable-line
      console.log(JSON.stringify(err, null, 2)); // eslint-disable-line

      return;
    }

    console.log(`=> Connected to db ${database} at ${host}:${port}`); // eslint-disable-line

    require('../fixtures');

    connectCb();
  });
}
