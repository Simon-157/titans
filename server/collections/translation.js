import Mongo from 'mongoose';
import { Collection } from './collection';

const { Mixed } = Mongo.Schema.Types;

const TranslationSchemaFields = {
  _id: {
    type: String,
  },
  data: {
    type: Mixed,
  },
};

const options = {
  collection: 'translations',
  versionKey: false,
};

const TranslationSchema = new Mongo.Schema(TranslationSchemaFields, options);

export const Translation = Collection(Mongo.model('Translation', TranslationSchema));
