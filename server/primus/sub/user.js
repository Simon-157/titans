import { User } from 'collections';

export default {
  async publicUser(props) {
    const { userId } = props;

    const user = await User.collection.findOne({
      _id: userId,
    }, {
      projection: {
        _id: 1,
        profilePicture: 1,
        username: 1,
      },
    });

    return {
      user,
    };
  },

  async userAccounts(props) {
    const { userId } = props;

    const user = await User.collection.findOne({
      _id: userId,
    }, {
      projection: {
        _id: 1,
        discord: 1,
        discordId: 1,
      },
    });

    return {
      user,
    };
  },

  async userValues(props) {
    const { userId } = props;

    const user = await User.collection.findOne({
      _id: userId,
    }, {
      projection: {
        _id: 1,
        energy: 1,
        fraction: 1,
        titanium: 1,
      },
    });

    return {
      user,
    };
  },
};
