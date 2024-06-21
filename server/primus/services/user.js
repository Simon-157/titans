import findIndex from 'lodash/findIndex';
import { emptyArr, STRING } from 'defaults';
import { User } from 'collections';
import { validate } from '../validate';

const service = {
  async getCurrent({ res, spark }) {
    res.send({
      user: spark.user,
    });
  },

  async unlinkWallet({ data, res, spark }) {
    validate(data, {
      wallet: STRING,
    });

    const { userId } = spark;

    if (!userId) {
      res.status(401).send('401 Unauthorized');

      return;
    }

    const query = { _id: userId };

    const record = await User.collection.findOne(query, {
      projection: {
        _id: 1,
        wallet: 1,
      },
    });

    if (!record) {
      res.status(404).send('404 - User Not Found');

      return;
    }

    const { wallet } = data;

    const index = findIndex(record.wallet, (w) => {
      return w === wallet;
    });

    if (index === -1) {
      res.send(1);

      return;
    }

    await User.collection.updateOne({
      _id: userId,
    }, {
      $pull: {
        wallet,
      },
    });

    record.wallet?.splice(index, 1);

    res.send({
      user: {
        _id: userId,
        wallet: record.wallet || emptyArr,
      },
    });
  },
};

export default service;
