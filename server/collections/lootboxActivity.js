import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const LootboxActivitySchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  date: {
    type: Date,
    default: Date,
  },
  discord: {
    type: String,
    index: true,
  },
  discordId: {
    type: String,
    index: true,
  },
  normal: {
    type: Number,
  },
  medium: {
    type: Number,
  },
  mega: {
    type: Number,
  },
  reason: {
    type: String,
    index: true,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: 'lootboxActivities',
  versionKey: false,
};

const LootboxActivitySchema = new Mongo.Schema(LootboxActivitySchemaFields, options);

export const LootboxActivity = Collection(Mongo.model('LootboxActivity', LootboxActivitySchema));
