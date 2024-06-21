import each from 'lodash/each';
import { User } from 'collections';

const users = [
  {
    _id: '5C1D6ADDB9E2AA8B',
    country: 'ukraine',
    email: 'hydraorc@gmail.com',
    login: 'hydra',
    username: 'Hydra',
    role: 'master',
    active: true,
    password: '$2b$10$U/SAb48D1OcjQGeeiwvRWeQyjOACu9RX.n6Oa4V8U651xqOw.Opo2',
    wallet: [
      '4Shgt2GcigBv78D3iqrVTvEN8HwX6fTBiCSinMJi8DZp',
    ],
  },
];

const projection = {
  _id: 1,
};

each(users, (item) => {
  const query = {
    _id: item._id,
  };

  User.collection.findOne(query, projection, (err, user) => {
    if (!user) {
      User.create(item);
    }
  });
});
