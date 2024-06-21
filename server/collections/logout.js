import Mongo from 'mongoose';
import { randomId } from 'lib/random';

const LogoutSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  date: {
    type: Date,
    default: Date,
  },
  iat: {
    type: Number,
    index: true,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: 'logouts',
  versionKey: false,
};

const LogoutSchema = new Mongo.Schema(LogoutSchemaFields, options);

export const Logout = Mongo.model('Logout', LogoutSchema);
