import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const BarSeasonSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  barId: {
    type: String,
    ref: 'Bar',
    index: true,
  },
  active: {
    type: Boolean,
  },
};

const options = {
  collection: 'barSeasons',
  versionKey: false,
};

const BarSeasonSchema = new Mongo.Schema(BarSeasonSchemaFields, options);

export const BarSeason = Collection(Mongo.model('BarSeason', BarSeasonSchema));
