import { emptyObj } from 'defaults';
import { UsersWeapons, Weapon } from 'collections';

export default {
  async myWeapons(props) {
    const { userId } = props;

    // const usersWeapons = await UsersWeapons.findAll({
    //   userId,
    // }, {
    //   projection: {
    //     _id: 1,
    //     characterId: 1,
    //     equippedAt: 1,
    //     type: 1,
    //     userId: 1,
    //     weaponId: 1,
    //   },
    // });

    const usersWeapons = await UsersWeapons.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: 'weapons',
          localField: 'weaponId',
          foreignField: '_id',
          as: 'userWeapon',
        },
      },
      {
        $project: {
          _id: 1,
          characterId: 1,
          equippedAt: 1,
          rarity: {
            $arrayElemAt: ['$userWeapon.rarity', 0],
          },
          scrolls: {
            $arrayElemAt: ['$userWeapon.scrolls', 0],
          },
          type: 1,
          userId: 1,
          weaponId: 1,
        },
      },
    ]);

    return {
      usersWeapons,
    };
  },

  async weapons() {
    const weapon = await Weapon.findAll(emptyObj, {
      projection: {
        _id: 1,
        desc: 1,
        img: 1,
        rarity: 1,
        title: 1,
        type: 1,
        scrolls: 1,
      },
    });

    return {
      weapon,
    };
  },
};
