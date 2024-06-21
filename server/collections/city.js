import Mongo from 'mongoose';
import { Collection } from './collection';

const CitySchemaFields = {
  _id: {
    type: String,
  },
  country: {
    type: String,
    ref: 'Country',
    index: true,
  },
};

const options = {
  collection: 'cities',
  versionKey: false,
};

const CitySchema = new Mongo.Schema(CitySchemaFields, options);

export const City = Collection(Mongo.model('City', CitySchema));
