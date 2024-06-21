import Mongo from 'mongoose';
import { GLOBAL } from 'defaults';
import { randomId } from 'lib/random';

const GlobalSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  rentedUntil: {
    type: Date,
    default: Date,
  },
};

const options = {
  collection: GLOBAL,
  versionKey: false,
};

const GlobalSchema = new Mongo.Schema(GlobalSchemaFields, options);

export const Global = Mongo.model('Global', GlobalSchema);
