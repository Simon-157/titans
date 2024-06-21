import { City } from 'collections';

export default {
  async citiesForFilter({ country }) {
    const query = {
      country,
    };

    const options = {
      projection: {
        _id: 1,
        country: 1,
      },
      sort: {
        _id: 1,
      },
    };

    const city = await City.findAll(query, options);

    return {
      city,
    };
  },
};
