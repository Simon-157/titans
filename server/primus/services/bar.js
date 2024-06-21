import each from 'lodash/each';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import { emptyArr } from 'defaults';
import { Bar, BarLeaderboard, BarSeason, BarStats } from 'collections';
import { escapeRegExp } from 'lib/string';
import { bar as config } from 'server/entities';
import { validate } from '../validate';

const { projection } = config;

export default {
  async get({ data, res }) {
    if (isString(data)) {
      const bar = await Bar.collection.findOne({
        _id: data,
      }, {
        projection,
      });

      res.send({
        bar,
      });

      return;
    }

    const { include, latLng, limit = 25, skip = 0, search } = data;

    const options = {
      projection,
      sort: {
        [latLng ? 'distance' : 'name']: 1,
      },
    };

    const query = {};

    if (include) {
      query._id = {
        $in: isArray(include) ? include : [include],
      };
    } else {
      if (search) {
        const words = search.split(' ');

        if (words.length) {
          query.$or = [];

          const fieldsToSearch = ['name'];

          each(fieldsToSearch, (field) => {
            const $or = {
              $and: [],
            };

            each(words, (word) => {
              const regExp = new RegExp(escapeRegExp(word), 'i');

              const obj = {};
              obj[field] = regExp;

              return $or.$and.push(obj);
            });

            query.$or.push($or);
          });
        }
      }

      if (limit) {
        options.limit = limit;
      }

      if (skip) {
        options.skip = skip;
      }
    }

    const bar = await Bar.findAll(query, options);

    res.send({
      bar,
    });
  },

  async join({ data, res, spark }) {
    validate(data, {
      barId: 'string',
    });

    const { barId } = data;

    const bar = await Bar.collection.findOne({
      _id: barId,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (!bar) {
      res.status(404).send('404 - Bar Not Found', res);

      return;
    }

    const barSeason = await BarSeason.collection.findOne({
      active: true,
    }, {
      projection: {
        _id: 1,
      },
    });

    const { userId } = spark;

    const barSeasonId = barSeason?._id;

    await BarLeaderboard.updateOne({
      barId,
      barSeason: barSeasonId,
      userId,
    }, {
      $set: {
        barId,
        barSeason: barSeasonId,
        userId,
      },
    }, {
      setDefaultsOnInsert: true,
      upsert: true,
    });

    global.updateSub(`barLeaderboard?barId=${barId}`);
  },

  async markers({ res }) {
    // const { east, north, south, west } = data;

    res.send(emptyArr);
  },

  async reach({ data }) {
    validate(data, {
      barId: 'string',
    });

    const { barId } = data;

    const bar = await Bar.collection.findOne({
      _id: barId,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (!bar) {
      return;
    }

    await BarStats.updateOne({
      barId,
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
    });

    const { barId } = data;

    const bar = await Bar.collection.findOne({
      _id: barId,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (!bar) {
      return;
    }

    await BarStats.updateOne({
      barId,
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
