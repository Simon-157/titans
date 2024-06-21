import Mongo from 'mongoose';
import { Collection } from './collection';

const PromoSchemaFields = {
  _id: {
    type: String,
  },
  actual: {
    type: Number,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  imgPrefix: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantityForOnline: {
    type: Number,
  },
  quantityLeft: {
    type: Number,
  },
  quantityLeftForOnline: {
    type: Number,
  },
  redeemed: {
    type: Number,
  },
  redeemedForOnline: {
    type: Number,
  },
  revenue: {
    type: Number,
  },
};

const options = {
  collection: 'promos',
  versionKey: false,
};

const PromoSchema = new Mongo.Schema(PromoSchemaFields, options);

export const Promo = Collection(Mongo.model('Promo', PromoSchema));
