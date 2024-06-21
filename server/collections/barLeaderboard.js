import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const BarLeaderboardSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  barId: {
    type: String,
    ref: 'Bar',
    index: true,
  },
  barSeason: {
    type: String,
    ref: 'BarSeason',
    index: true,
  },
  date: {
    type: Date,
    default: Date,
  },
  points: {
    type: Number,
    default: 0,
  },
  position: {
    type: Number,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
  username: {
    type: String,
  },
};

const options = {
  collection: 'barLeaderboards',
  versionKey: false,
};

const BarLeaderboardSchema = new Mongo.Schema(BarLeaderboardSchemaFields, options);

export const BarLeaderboard = Collection(Mongo.model('BarLeaderboard', BarLeaderboardSchema));
