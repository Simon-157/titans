import dayjs from 'dayjs';
import isNil from 'lodash/isNil';
import { emptyObj } from 'defaults';
import { Event, EventAttendance } from 'collections';

export default {
  async attendingEvent({ eventId }) {
    const eventAttendance = await EventAttendance.findAll({
      eventId,
    }, {
      projection: {
        _id: 1,
        eventId: 1,
        userId: 1,
      },
    });

    return {
      eventAttendance,
    };
  },

  async event({ eventId, shortUrl }) {
    const query = {};

    if (shortUrl) {
      query.shortUrl = shortUrl;
    } else {
      query.eventId = eventId;
    }

    const event = await Event.aggregateOne([
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'bars',
          localField: 'barId',
          foreignField: '_id',
          as: 'bar',
        },
      },
      {
        $lookup: {
          from: 'promos',
          localField: 'promoId',
          foreignField: '_id',
          as: 'promo',
        },
      },
      {
        $project: {
          _id: 1,
          approved: 1,
          barId: 1,
          capacity: 1,
          city: 1,
          country: 1,
          createdAt: 1,
          description: 1,
          discordUrl: 1,
          endAt: 1,
          gameId: 1,
          gameInput: 1,
          promoId: 1,
          shortUrl: 1,
          startAt: 1,
          streamLink: 1,
          title: 1,
          userId: 1,
          bar: {
            _id: 1,
            capacity: 1,
            fullLocation: 1,
            latitude: 1,
            longitude: 1,
            name: 1,
            shortUrl: 1,
          },
          promo: {
            _id: 1,
            desc: 1,
            img: 1,
            imgPrefix: 1,
            name: 1,
          },
        },
      },
    ]);

    if (!event) {
      return emptyObj;
    }

    const { bar, promo } = event;

    delete event.bar;
    delete event.promo;

    return {
      bar: bar?.[0],
      event,
      promo: promo?.[0],
    };
  },

  async pastEvents({
    barId,
    city,
    country,
    gameId,
    limit = 9,
    region,
    tournamentId,
  }) {
    const query = {
      approved: true,
      endAt: {
        $lt: dayjs.utc().add(1, 'hour').toDate(),
      },
    };

    if (barId) {
      query.barId = barId;
    }

    if (country) {
      query.country = country;

      if (city) {
        query.city = city;
      }
    } else if (region) {
      query.region = region;
    }

    if (gameId) {
      query.gameId = gameId;
    }

    if (tournamentId) {
      query.tournamentId = tournamentId;
    }

    const options = {
      projection: {
        _id: 1,
        barId: 1,
        city: 1,
        country: 1,
        endAt: 1,
        gameId: 1,
        gameInput: 1,
        region: 1,
        shortUrl: 1,
        startAt: 1,
        streamLink: 1,
        title: 1,
      },
      sort: {
        startAt: -1,
      },
    };

    if (!isNil(limit)) {
      options.limit = +limit;
    }

    const event = await Event.findAll(query, options);

    return {
      event,
    };
  },

  async upcomingEvents({
    barId,
    city,
    country,
    gameId,
    limit,
    region,
    tournamentId,
  }) {
    const query = {
      approved: true,
      endAt: {
        $gte: dayjs.utc().add(1, 'hour').toDate(),
      },
    };

    if (barId) {
      query.barId = barId;
    }

    if (country) {
      query.country = country;

      if (city) {
        query.city = city;
      }
    } else if (region) {
      query.region = region;
    }

    if (gameId) {
      query.gameId = gameId;
    }

    if (tournamentId) {
      query.tournamentId = tournamentId;
    }

    const options = {
      projection: {
        _id: 1,
        barId: 1,
        city: 1,
        country: 1,
        endAt: 1,
        gameId: 1,
        gameInput: 1,
        region: 1,
        shortUrl: 1,
        startAt: 1,
        streamLink: 1,
        title: 1,
      },
      sort: {
        startAt: -1,
      },
    };

    if (!isNil(limit)) {
      options.limit = +limit;
    }

    const event = await Event.findAll(query, options);

    return {
      event,
    };
  },
};
