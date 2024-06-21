import Mongo from 'mongoose';
import { USER, USERS } from 'defaults';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const UserSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  allowEmail: {
    type: Boolean,
  },
  allowPromo: {
    type: Boolean,
  },
  birthDate: {
    type: Date,
  },
  country: {
    type: String,
    ref: 'Country',
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date,
  },
  discord: {
    type: String,
  },
  discordId: {
    type: String,
  },
  email: {
    type: String,
    index: true,
  },
  energy: {
    type: Number,
    default: 5,
  },
  energyChangedAt: {
    type: Date,
    default: Date,
  },
  fraction: {
    type: String,
  },
  ip: [{
    type: String,
  }],
  lastLogin: {
    type: Date,
  },
  login: {
    type: String,
    index: true,
    unique: true,
  },
  origin: [{
    type: String,
  }],
  password: {
    type: String,
  },
  passwordChangedAt: {
    type: Date,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    default: USER,
    index: true,
  },
  titanium: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  wallet: {
    type: [String],
    index: true,
  },
  username: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    index: true,
  },
  verified: {
    type: Boolean,
  },
};

const options = {
  collection: USERS,
  versionKey: false,
};

const UserSchema = new Mongo.Schema(UserSchemaFields, options);

export const User = Collection(Mongo.model('User', UserSchema));
