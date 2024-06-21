import Mongo from 'mongoose';
import { randomId } from 'lib/random';

const { Mixed } = Mongo.Schema.Types;

const LogSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  data: {
    type: Mixed,
  },
  date: {
    type: Date,
    default: Date,
    // index: true,
  },
  message: {
    type: String,
  },
  pathname: {
    type: String,
  },
  server: {
    type: Boolean,
    // index: true,
  },
  stack: {
    type: String,
  },
  type: {
    type: String,
    // index: true,
  },
  userId: {
    type: String,
    ref: 'User',
    // index: true,
  },
  userAgent: {
    type: Mixed,
  },
};

const options = {
  collection: 'logs',
  versionKey: false,
};

const LogSchema = new Mongo.Schema(LogSchemaFields, options);

export const Log = Mongo.model('Log', LogSchema);
