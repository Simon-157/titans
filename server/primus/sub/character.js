import { Character } from 'collections';
import { addWeaponScrolls, characterAggregation } from 'server/lib/character';
import exp from 'server/lib/experience';

export default {
  async character(props) {
    const { characterId } = props;

    const character = await Character.collection.aggregate([
      {
        $match: {
          _id: `${characterId}`,
        },
      },
      ...characterAggregation,
    ]).toArray();

    await addWeaponScrolls(character);

    return {
      character,
    };
  },

  async characterExperience(props) {
    const { characterId } = props;

    const character = await exp.getCharacterExperience(characterId);

    const { experience, level } = character;

    return {
      character: {
        _id: characterId,
        experience,
        level,
      },
    };
  },

  async characters(props) {
    const { userId } = props;

    const character = await Character.collection.aggregate([
      {
        $match: {
          userId,
        },
      },
      ...characterAggregation,
    ]).toArray();

    await addWeaponScrolls(character);

    return {
      character,
    };
  },

  async ownedCharacters(props) {
    const { userId } = props;

    const character = await Character.findAll({
      $or: [
        {
          owner: userId,
        },
        {
          owner: null,
          userId,
        },
      ],
    }, {
      projection: {
        _id: 1,
        element: 1,
        level: 1,
        maker: 1,
        name: 1,
        owner: 1,
        rentedUntil: 1,
        taker: 1,
        userId: 1,
      },
    });

    return {
      character,
    };
  },

  async charactersForRent() {
    const character = await Character.findAll({
      maker: {
        $exists: true,
      },
    }, {
      projection: {
        _id: 1,
        element: 1,
        level: 1,
        maker: 1,
        name: 1,
        owner: 1,
        rentedUntil: 1,
        taker: 1,
        userId: 1,
        v: 1,
      },
    });

    return {
      character,
    };
  },
};
