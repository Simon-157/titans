import { BarLeaderboard, BarSeason } from 'collections';

export default {
  async barLeaderboard({
    barId,
  }) {
    const barSeason = await BarSeason.collection.findOne({
      active: true,
    }, {
      projection: {
        _id: 1,
      },
    });

    const barSeasonId = barSeason?._id;

    const query = {
      barId,
      barSeasonId,
    };

    const barLeaderboard = await BarLeaderboard.findAll(query);

    return {
      barLeaderboard,
    };
  },
};
