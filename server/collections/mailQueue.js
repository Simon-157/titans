import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const MailQueueSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  options: {
    type: Mongo.Schema.Types.Mixed,
  },
  date: {
    type: Date,
    default: Date,
  },
};

const options = {
  collection: 'mailQueues',
  versionKey: false,
};

const MailQueueSchema = new Mongo.Schema(MailQueueSchemaFields, options);

export const MailQueue = Collection(Mongo.model('MailQueue', MailQueueSchema));
