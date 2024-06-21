import { Global } from 'collections';

export default {
  async global() {
    const global = await Global.collection.findOne();

    return {
      global,
    };
  },
};
