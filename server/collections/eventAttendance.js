import Mongo from 'mongoose';
import { randomId } from 'lib/random';
import { Collection } from './collection';

const EventAttendanceSchemaFields = {
  _id: {
    type: String,
    default: randomId,
  },
  date: {
    type: Date,
    default: Date,
  },
  endMailSentAt: {
    type: Date,
  },
  eventId: {
    type: String,
    ref: 'Event',
    index: true,
  },
  online: {
    type: Boolean,
  },
  reminderSentAt: {
    type: Date,
  },
  userId: {
    type: String,
    ref: 'User',
    index: true,
  },
};

const options = {
  collection: 'eventAttendances',
  versionKey: false,
};

const EventAttendanceSchema = new Mongo.Schema(EventAttendanceSchemaFields, options);

export const EventAttendance = Collection(Mongo.model('EventAttendance', EventAttendanceSchema));
