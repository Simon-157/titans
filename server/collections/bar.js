import Mongo from 'mongoose';
import { Collection } from './collection';

const BarSchemaFields = {
  _id: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date,
  },
  description: {
    type: String,
    required: true,
  },
  fullLocation: {
    type: String,
  },
  hours: {
    type: String,
  },
  img: {
    type: String,
  },
  imgPrefix: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  latitude: {
    type: Number,
    index: true,
  },
  location: {
    type: String,
  },
  longitude: {
    type: Number,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  region: {
    type: String,
  },
  shortUrl: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  twitterLink: {
    type: String,
  },
  website: {
    type: String,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: 'bars',
  versionKey: false,
};

const BarSchema = new Mongo.Schema(BarSchemaFields, options);

export const Bar = Collection(Mongo.model('Bar', BarSchema));
