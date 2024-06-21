import { Settings } from 'collections';

export default {
  async set({ data, res, spark }) {
    const { user } = spark;

    if (!user) {
      res.status(401).send('401 Unauthorized');

      return;
    }

    const userId = user.id;

    const { autoApproval } = data;

    await Settings.updateOne({
      userId,
    }, {
      $set: {
        autoApproval,
      },
    }, {
      setDefaultsOnInsert: true,
      upsert: true,
    });

    global.updateSub([`settings?userId=${userId}`]);

    res.send(1);
  },
};
