import { Code } from 'collections';

export default {
  async codeForEvent({ eventId, online, userId }) {
    const code = await Code.collection.findOne({
      eventId,
      online,
      userId,
    });

    return {
      code,
    };
  },
};
