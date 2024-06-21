import dayjs from 'dayjs';
import chunk from 'lodash/chunk';
import each from 'lodash/each';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import { emptyObj } from 'defaults';
import { Bar, Event, EventAttendance, EventStats, Promo } from 'collections';
import { syncWithOpenedSockets } from 'server/connectors/redisSub';
import { event as config } from 'server/entities';
import { generateCode } from 'server/lib/code';
import { validate } from '../validate';

const { projection } = config;

export default {
  async attend({ data, res, spark }) {
    validate(data, {
      eventId: 'string',
    });

    const { eventId, online } = data;

    const event = await Event.collection.findOne({
      _id: eventId,
    }, {
      projection: {
        _id: 1,
        barId: 1,
        capacity: 1,
        endAt: 1,
        promoId: 1,
      },
    });

    if (!event) {
      res.status(404).send('404 - Event Not Found', res);

      return;
    }

    const { userId } = spark;

    const interest = await EventAttendance.collection.findOne({
      eventId,
      userId,
    });

    if (interest) {
      res.status(400).send('event.registered', res);

      return;
    }

    const { barId, capacity, endAt, promoId } = event;

    const now = dayjs();

    if (now.diff(endAt) > 0) {
      res.status(400).send('SOLD OUT', res);

      return;
    }

    if (!online) {
      const [bar, interested] = await Promise.all([
        Bar.collection.findOne({
          _id: barId,
        }, {
          projection: {
            _id: 1,
            capacity: 1,
          },
        }),
        EventAttendance.findAll({
          eventId,
          userId: {
            $ne: userId,
          },
        }, {
          projection: {
            _id: 1,
          },
        }),
      ]);

      const { capacity: barCapacity = capacity } = bar || emptyObj;

      const resultCapacity = (
        !isNil(barCapacity) &&
          (isNil(capacity) || capacity > barCapacity)
      ) ?
        barCapacity :
        capacity;

      if (!isNil(resultCapacity) && (interested.length >= ((resultCapacity * 1.15) | 0))) {
        res.status(400).send('SOLD OUT', res);

        return;
      }
    }

    const promises = [
      EventAttendance.create({
        date: now.toDate(),
        eventId,
        online,
        userId,
      }),
    ];

    if (promoId) {
      const promo = await Promo.collection.findOne({
        _id: promoId,
      }, {
        projection: {
          _id: 1,
          quantityLeft: 1,
          quantityLeftForOnline: 1,
        },
      });

      if (promo) {
        if (
          (online && promo.quantityLeftForOnline) ||
          (!online && promo.quantityLeft)
        ) {
          promises.push(generateCode({ eventId, promoId, userId, online }));
        }
      }
    }

    await Promise.all(promises);

    global.updateSub(`attendingEvent?eventId=${eventId}`);
  },

  async unattend({ data, res, spark }) {
    validate(data, {
      eventId: 'string',
    });

    const { eventId, online } = data;

    const event = await Event.collection.findOne({
      _id: eventId,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (!event) {
      res.status(404).send('404 - Event Not Found', res);

      return;
    }

    const { userId } = spark;

    const interest = await EventAttendance.collection.findOne({
      eventId,
      online,
      userId,
    });

    const subscription = `attendingEvent?eventId=${eventId}`;

    if (!interest) {
      global.updateSub(subscription);

      return;
    }

    const { _id } = interest;

    await EventAttendance.collection.deleteOne({
      _id: interest._id,
    });

    syncWithOpenedSockets({
      subscription: 'activeSeason?',
      data: {
        eventAttendance: {
          remove: _id,
        },
      },
    });

    global.updateSub(subscription);
  },

  async get({ data, res, spark }) {
    if (isString(data)) {
      const event = await Event.collection.findOne({
        _id: data,
      }, {
        projection,
      });

      const { promoId } = event;

      let promo;
      if (promoId) {
        promo = await Promo.collection.findOne({
          _id: promoId,
        });
      }

      res.send({
        event,
        promo,
      });

      return;
    }

    const {
      approved,
      eventId,
      limit = 25,
      skip = 0,
    } = data;

    const query = {};

    if (approved) {
      query.approved = true;
    }

    if (eventId) {
      query._id = {
        $ne: eventId,
      };
    }

    const options = {
      projection: {
        _id: 1,
        barId: 1,
        city: 1,
        country: 1,
        endAt: 1,
        shortUrl: 1,
        startAt: 1,
        title: 1,
      },
    };

    if (limit) {
      options.limit = limit;
    }

    if (skip) {
      options.skip = skip;
    }

    let event = await Event.findAll(query, options);

    if (event.length <= 250000) {
      res.send({
        event,
      });
    } else {
      each(chunk(event, 250000), (arr, key) => {
        if (key === 0) {
          res.send({
            event: arr,
          });
        } else {
          spark.write({
            type: 0,
            data: ['response', null, {
              event: arr,
            }],
          });
        }
      });
    }

    event = null;
  },

  async reach({ data }) {
    validate(data, {
      barId: 'string',
      eventId: 'string',
    });

    const { barId, eventId } = data;

    const event = await Event.collection.findOne({
      _id: eventId,
      barId,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (!event) {
      return;
    }

    await EventStats.updateOne({
      barId,
      eventId,
    }, {
      $inc: {
        reach: 1,
      },
    }, {
      setDefaultsOnInsert: true,
      upsert: true,
    });
  },

  async view({ data }) {
    validate(data, {
      barId: 'string',
      eventId: 'string',
    });

    const { barId, eventId } = data;

    const event = await Event.collection.findOne({
      _id: eventId,
      barId,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (!event) {
      return;
    }

    await EventStats.updateOne({
      barId,
      eventId,
    }, {
      $inc: {
        views: 1,
      },
    }, {
      setDefaultsOnInsert: true,
      upsert: true,
    });
  },
};
