import { Settings } from 'collections';

export default {
  async settings(props) {
    const { userId } = props;

    const settings = await Settings.collection.findOne({
      userId,
    }, {
      projection: {
        _id: 1,
        autoApproval: 1,
        userId: 1,
      },
    });

    return {
      settings,
    };
  },
};
