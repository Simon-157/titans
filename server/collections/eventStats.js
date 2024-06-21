import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const EventStatsSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  barId: {
    type: String,
    ref: 'Bar',
    index: true,
  },
  eventId: {
    type: String,
    ref: 'Event',
    index: true,
    unique: true,
  },
  reach: {
    type: Number,
  },
  views: {
    type: Number,
  },
};

const options = {
  collection: 'eventStats',
  versionKey: false,
};

const EventStatsSchema = new Mongo.Schema(EventStatsSchemaFields, options);

export const EventStats = Collection(Mongo.model('EventStats', EventStatsSchema));
