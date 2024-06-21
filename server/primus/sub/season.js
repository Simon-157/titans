import { getActiveSeason } from 'server/lib/season';

export default {
  async activeSeason() {
    const season = await getActiveSeason();

    return {
      season: {
        _id: season,
        active: true,
      },
    };
  },
};
