import Mongo from 'mongoose';
import { Collection } from './collection';

const EventSchemaFields = {
  _id: {
    type: String,
  },
  approved: {
    type: Boolean,
    index: true,
  },
  barId: {
    type: String,
    ref: 'Bar',
    index: true,
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
  },
  discordUrl: {
    type: String,
  },
  endAt: {
    type: Date,
    required: true,
    index: true,
  },
  gameId: {
    type: String,
  },
  gameInput: {
    type: String,
  },
  img: {
    type: String,
  },
  imgPrefix: {
    type: String,
  },
  promoId: {
    type: String,
  },
  region: {
    type: String,
  },
  shortUrl: {
    type: String,
    index: true,
    required: true,
  },
  startAt: {
    type: Date,
    required: true,
  },
  streamId: {
    type: String,
  },
  streamLink: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  tournamentId: {
    type: String,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: 'events',
  versionKey: false,
};

const EventSchema = new Mongo.Schema(EventSchemaFields, options);

export const Event = Collection(Mongo.model('Event', EventSchema));
