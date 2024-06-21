import Mongo from 'mongoose';
import { SEASONS } from 'defaults';
import { randomId } from 'lib/random';

const SeasonSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  active: {
    type: Boolean,
    default: false,
    index: true,
  },
  date: {
    type: Date,
    default: Date,
  },
};

const options = {
  collection: SEASONS,
  versionKey: false,
};

const SeasonSchema = new Mongo.Schema(SeasonSchemaFields, options);

export const Season = Mongo.model('Season', SeasonSchema);
