import isNil from 'lodash/isNil';
import { emptyObj } from 'defaults';
import { Bar } from 'collections';

export default {
  async closestBars({
    city,
    country,
    latLng,
    limit,
  }) {
    const query = {};

    if (country) {
      query.country = country;

      if (city) {
        query.city = city;
      }
    }

    const options = {
      projection: {
        _id: 1,
        fullLocation: 1,
        img: 1,
        latitude: 1,
        longitude: 1,
        name: 1,
        region: 1,
        shortUrl: 1,
      },
      sort: latLng ? {
        distance: -1,
      } : {
        name: 1,
      },
    };

    // if (latLng) {
    //   const [lat, lng] = latLng.split(',');
    //
    //   select.push(mysql.knex.raw(`(3959 * ACOS(COS(RADIANS(${lat})) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(${lng})) + SIN(RADIANS(${lat})) * SIN(RADIANS(latitude)))) AS distance`));
    // }

    if (!isNil(limit)) {
      options.limit = limit;
    }

    const bar = await Bar.findAll(query, options);

    return {
      bar,
    };
  },

  async bar(props) {
    const { shortUrl } = props;

    const bar = await Bar.collection.findOne({
      shortUrl,
    }, {
      projection: {
        _id: 1,
        capacity: 1,
        city: 1,
        country: 1,
        description: 1,
        fullLocation: 1,
        img: 1,
        latitude: 1,
        longitude: 1,
        name: 1,
        phone: 1,
        rating: 1,
        shortUrl: 1,
        userId: 1,
        website: 1,
      },
    });

    return {
      bar,
    };
  },

  async followingBars() {
    // const { barId } = props;

    return emptyObj;
  },

  async imagesForBar() {
    // const { barId } = props;

    return emptyObj;
  },

  async managersForBar() {
    // const { barId } = props;

    return emptyObj;
  },
};
