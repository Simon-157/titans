import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const BarStatsSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  barId: {
    type: String,
    ref: 'Bar',
    index: true,
    unique: true,
  },
  reach: {
    type: Number,
  },
  views: {
    type: Number,
  },
};

const options = {
  collection: 'barStats',
  versionKey: false,
};

const BarStatsSchema = new Mongo.Schema(BarStatsSchemaFields, options);

export const BarStats = Collection(Mongo.model('BarStats', BarStatsSchema));
