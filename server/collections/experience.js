import Mongo from 'mongoose';
import { EXPERIENCE_GAINS } from 'defaults';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const ExperienceSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  amount: {
    type: Number,
    default: 10,
  },
  date: {
    type: Date,
    default: Date,
  },
  identifier: {
    type: String,
    index: true,
  },
  reason: {
    type: String,
    index: true,
  },
  characterId: {
    type: String,
    ref: 'Character',
    index: true,
  },
  userId: {
    type: String,
    ref: 'User',
  },
};

const options = {
  collection: EXPERIENCE_GAINS,
  versionKey: false,
};

const ExperienceSchema = new Mongo.Schema(ExperienceSchemaFields, options);

export const Experience = Collection(Mongo.model('Experience', ExperienceSchema));
