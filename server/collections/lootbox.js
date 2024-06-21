import Mongo from 'mongoose';
import { LOOTBOXES } from 'defaults';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const LootboxSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  allowSync: {
    type: Boolean,
    default: true,
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
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: LOOTBOXES,
  versionKey: false,
};

const LootboxSchema = new Mongo.Schema(LootboxSchemaFields, options);

export const Lootbox = Collection(Mongo.model('Lootbox', LootboxSchema));
