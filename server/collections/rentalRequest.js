import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const RentalRequestSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  accepted: {
    type: Date,
    index: true,
  },
  characterId: {
    type: String,
    ref: 'Character',
    index: true,
  },
  declined: {
    type: Date,
    index: true,
  },
  owner: {
    type: String,
    ref: 'User',
    index: true,
  },
  requestedAt: {
    type: Date,
    default: Date,
    index: true,
  },
  taker: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: 'rentalRequests',
  versionKey: false,
};

const RentalRequestSchema = new Mongo.Schema(RentalRequestSchemaFields, options);

export const RentalRequest = Collection(Mongo.model('RentalRequest', RentalRequestSchema));
