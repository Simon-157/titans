import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const UsersWeaponsSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  characterId: {
    type: String,
    ref: 'Character',
    index: true,
  },
  equippedAt: {
    type: Date,
  },
  obtainedAt: {
    type: Date,
    default: Date,
  },
  reason: {
    type: String,
  },
  type: {
    type: String,
    index: true,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
  weaponId: {
    type: String,
    index: true,
  },
};

const options = {
  collection: 'usersWeapons',
  versionKey: false,
};

const UsersWeaponsSchema = new Mongo.Schema(UsersWeaponsSchemaFields, options);

export const UsersWeapons = Collection(Mongo.model('UsersWeapons', UsersWeaponsSchema));
