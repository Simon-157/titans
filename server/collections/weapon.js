import Mongo from 'mongoose';
import { WEAPONS } from 'defaults';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const WeaponSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  img: {
    type: String,
  },
  index: {
    type: Number,
    index: true,
  },
  rarity: {
    type: String,
    index: true,
  },
  rarityDna: {
    type: String,
  },
  reason: {
    type: String,
    index: true,
  },
  scrolls: {
    type: [String],
  },
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  weaponDna: {
    type: String,
  },
};

const options = {
  collection: WEAPONS,
  versionKey: false,
};

const WeaponSchema = new Mongo.Schema(WeaponSchemaFields, options);

export const Weapon = Collection(Mongo.model('Weapon', WeaponSchema));
