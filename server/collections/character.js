import Mongo from 'mongoose';
import { CHARACTERS } from 'defaults';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const CharacterSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  agility: {
    type: Number,
    default: 10,
  },
  attack: {
    type: Number,
    default: 10,
  },
  createdAt: {
    type: Date,
    default: Date,
  },
  defense: {
    type: Number,
    default: 10,
  },
  dna: {
    type: String,
  },
  element: {
    type: String,
  },
  image: {
    type: String,
  },
  isDefensive: {
    type: Boolean,
    index: true,
  },
  lastMatchDate: {
    type: Date,
    index: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  // listedForRental: {
  //   type: Boolean,
  // },
  maker: {
    type: String,
  },
  magicka: {
    type: Number,
    default: 10,
  },
  mint: {
    type: String,
  },
  name: {
    type: String,
  },
  owner: {
    type: String,
    ref: 'User',
  },
  rentedUntil: {
    type: Date,
  },
  scrolls: {
    type: [String],
  },
  taker: {
    type: String,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
  xpFreezeUntil: {
    type: Date,
  },
  v: { // Image version
    type: Number,
    default: 0,
  },
};

const options = {
  collection: CHARACTERS,
  versionKey: false,
};

const CharacterSchema = new Mongo.Schema(CharacterSchemaFields, options);

export const Character = Collection(Mongo.model('Character', CharacterSchema));
