import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const CodeSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  code: {
    type: String,
    index: true,
    unique: true,
  },
  img: {
    type: String,
  },
  online: {
    type: Boolean,
  },
  png: {
    type: String,
  },
  promoId: {
    type: String,
    ref: 'Promo',
    index: true,
  },
  redeemed: {
    type: Date,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: 'codes',
  versionKey: false,
};

const CodeSchema = new Mongo.Schema(CodeSchemaFields, options);

export const Code = Collection(Mongo.model('Code', CodeSchema));
