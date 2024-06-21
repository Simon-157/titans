import Mongo from 'mongoose';
import { randomId } from 'lib/random';

const SettingsSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  autoApproval: {
    type: Number,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: 'settings',
  versionKey: false,
};

const SettingsSchema = new Mongo.Schema(SettingsSchemaFields, options);

export const Settings = Mongo.model('Settings', SettingsSchema);
