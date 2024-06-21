import { Lootbox } from 'collections';

export default {
  async lootboxes(props) {
    const { userId } = props;

    const lootbox = await Lootbox.collection.findOne({
      userId,
    }, {
      projection: {
        _id: 1,
        medium: 1,
        mega: 1,
        normal: 1,
        userId: 1,
      },
    });

    return {
      lootbox,
    };
  },
};
