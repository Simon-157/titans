import Mongo from 'mongoose';
import { Collection } from './collection';

const { Mixed } = Mongo.Schema.Types;

const BalanceSchemaFields = {
  _id: {
    type: String,
  },
  data: {
    type: Mixed,
  },
  dateCreated: {
    type: Date,
    default: Date,
  },
  datePublished: {
    type: Date,
  },
  active: {
    type: Boolean,
    index: true,
  },
};

const options = {
  collection: 'balances',
  versionKey: false,
};

const BalanceSchema = new Mongo.Schema(BalanceSchemaFields, options);

export const Balance = Collection(Mongo.model('Balance', BalanceSchema));
