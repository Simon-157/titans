import dayjs from 'dayjs';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
// import map from 'lodash/map';
import {
  emptyObj,
  ADMIN,
  AUTO_APPROVAL,
  CHARACTER,
  SET,
  STRING,
} from 'defaults';
import { Character, RentalRequest, Settings, UsersWeapons } from 'collections';
import { asyncEach } from 'lib/object';
import { hasAccess } from 'lib/role';
// import { unequipWeapon } from 'server/lib/character';
import { getGlobalSettings } from 'server/lib/global';
import { acceptRentalRequest } from 'server/lib/rentalRequest';
import { validate } from '../validate';

export default {
  async listForRental({ data, res, spark } = emptyObj) {
    const now = dayjs();

    const { rentedUntil } = await getGlobalSettings();

    if (!rentedUntil || now.isAfter(rentedUntil)) {
      res.status(403).send('403 Forbidden - Rental Date Not Set');

      return;
    }

    const { characterId } = data;

    let ids = characterId;

    if (isString(characterId)) {
      ids = [characterId];
    } else if (!isArray(ids)) {
      res.status(400).send('400 - characterId field is required');

      return;
    }

    const { user } = spark;

    if (!user) {
      res.status(401).send('401 Unauthorized');

      return;
    }

    const characters = await Character.findAll({
      _id: {
        $in: ids,
      },
    }, {
      projection: {
        _id: 1,
        owner: 1,
        userId: 1,
      },
    });

    if (characters.length === 0) {
      return;
    }

    const userId = user.id;

    let processedWeapons;
    const promises = [];
    const subs = [];

    await asyncEach(characters, async function listEachCharacter(character) {
      const { _id, owner } = character;

      if (_id.length === 17) {
        return;
      }

      const allow = hasAccess({
        action: SET,
        item: {
          userId: owner || character.userId,
        },
        type: CHARACTER,
        user,
      });

      if (!allow) {
        return;
      }

      const weapons = await UsersWeapons.findAll({
        characterId: _id,
        userId,
      }, {
        projection: {
          _id: 1,
          type: 1,
          weaponId: 1,
        },
      });

      if (weapons.length !== 0) {
        processedWeapons = true;
      }

      promises.push(
        Character.collection.updateOne({
          _id,
        }, {
          $set: {
            maker: userId,
          },
        }),
        // ...map(weapons, (w) => {
        //   const { type, weaponId } = w;
        //
        //   return unequipWeapon({
        //     _id,
        //     type,
        //     user,
        //     weaponId,
        //   });
        // }),
      );

      subs.push(`character?characterId=${_id}`);
    });

    if (promises.length !== 0) {
      await Promise.all(promises);

      subs.push(
        `characters?userId=${userId}`,
        'charactersForRent?',
      );

      if (processedWeapons) {
        subs.push(`myWeapons?userId=${userId}`);
      }

      global.updateSub(subs);
    }

    res.send(1);
  },

  async unlistForRental({ data, res, spark } = emptyObj) {
    const { characterId } = data;

    let ids = characterId;

    if (isString(characterId)) {
      ids = [characterId];
    } else if (!isArray(ids)) {
      res.status(400).send('400 - characterId field is required');

      return;
    }

    const { user } = spark;

    if (!user) {
      res.status(401).send('401 Unauthorized');

      return;
    }

    const characters = await Character.findAll({
      _id: {
        $in: ids,
      },
    }, {
      projection: {
        _id: 1,
        maker: 1,
        owner: 1,
        userId: 1,
      },
    });

    if (characters.length === 0) {
      return;
    }

    const userId = user.id;

    const promises = [];
    const subs = [];

    await asyncEach(characters, async function listEachCharacter(character) {
      const { _id, maker, owner } = character;

      if (_id.length === 17 || !maker) {
        return;
      }

      const allow = hasAccess({
        action: SET,
        item: {
          userId: owner || character.userId,
        },
        type: CHARACTER,
        user,
      });

      if (!allow) {
        return;
      }

      promises.push(
        Character.collection.updateOne({
          _id,
        }, {
          $set: {
            maker: null,
          },
        }),
        RentalRequest.collection.updateMany({
          characterId: _id,
          accepted: null,
          declined: null,
        }, {
          $set: {
            accepted: null,
            declined: new Date(),
            owner: userId,
          },
        }),
      );

      subs.push(`character?characterId=${_id}`);
    });

    if (promises.length !== 0) {
      await Promise.all(promises);

      subs.push(
        `characters?userId=${userId}`,
        'charactersForRent?',
        `rentalRequests?userId=${userId}`,
      );

      global.updateSub(subs);
    }

    res.send(1);
  },

  async rent({ data, res, spark } = emptyObj) {
    validate(data, {
      characterId: STRING,
    });

    const { characterId } = data;

    if (characterId.length === 17) {
      res.status(403).send('403 Forbidden - Can Not Rent Non-NFT Titans');

      return;
    }

    const now = dayjs();

    const { rentedUntil } = await getGlobalSettings();

    if (!rentedUntil || now.isAfter(rentedUntil)) {
      res.status(403).send('403 Forbidden - Rental Date Not Set');

      return;
    }

    const { user } = spark;

    if (!user) {
      res.status(401).send('401 Unauthorized');

      return;
    }

    const character = await Character.collection.findOne({
      _id: characterId,
    }, {
      projection: {
        _id: 1,
        maker: 1,
        owner: 1,
        taker: 1,
        userId: 1,
      },
    });

    if (!character) {
      res.status(404).send('404 - Character Not Found');

      return;
    }

    const userId = user.id;

    const { maker, owner, taker } = character;

    if (!maker || taker || owner === userId || userId === character.userId) {
      res.status(403).send('403 Forbidden');

      return;
    }

    const alreadyRented = await Character.findAll({
      taker: userId,
    }, {
      projection: {
        _id: 1,
      },
    });

    if (alreadyRented.length >= 4) {
      res.status(403).send('403 Forbidden - Already Renting 4 Titans');

      return;
    }

    const ownerSettings = await Settings.collection.findOne({
      userId: owner,
    }, {
      projection: {
        _id: 1,
        autoApproval: 1,
      },
    });

    const approvalProcess = get(ownerSettings, [AUTO_APPROVAL]);

    if (approvalProcess) {
      const existingRequest = await RentalRequest.collection.findOne({
        accepted: null,
        characterId,
        declined: null,
        owner: owner || character.userId,
        taker: userId,
      }, {
        projection: {
          _id: 1,
        },
      });

      if (existingRequest) {
        res.send(1);

        return;
      }

      await RentalRequest.create({
        characterId,
        owner: owner || character.userId,
        taker: userId,
      });

      global.updateSub([
        `rentalRequests?userId=${owner}`,
        `rentalRequests?userId=${userId}`,
      ]);

      res.send(1);

      return;
    }

    await Character.collection.updateOne({
      _id: characterId,
    }, {
      $set: {
        owner: owner || character.userId,
        rentedUntil,
        taker: userId,
        userId,
      },
    });

    const subs = [
      `character?characterId=${characterId}`,
      `characters?userId=${userId}`,
      'charactersForRent?',
      `ownedCharacters?userId=${owner || character.userId}`,
    ];

    if (owner) {
      subs.push(`characters?userId=${owner}`);
    }

    global.updateSub(subs);

    res.send(1);
  },

  async accept({ data, res, spark } = emptyObj) {
    validate(data, {
      characterId: STRING,
      requestId: STRING,
    });

    const { user } = spark;

    if (!user) {
      res.status(401).send('401 Unauthorized');

      return;
    }

    const now = dayjs();

    const { rentedUntil } = await getGlobalSettings();

    if (!rentedUntil || now.isAfter(rentedUntil)) {
      res.status(403).send('403 Forbidden - Rental Date Not Set');

      return;
    }

    const { characterId, requestId } = data;

    const character = await Character.collection.findOne({
      _id: characterId,
    }, {
      projection: {
        _id: 1,
        owner: 1,
        userId: 1,
      },
    });

    if (!character) {
      res.status(404).send('404 - Character Not Found');

      return;
    }

    const { owner } = character;

    const allow = hasAccess({
      action: SET,
      item: {
        userId: owner || character.userId,
      },
      type: CHARACTER,
      user,
    });

    if (!allow) {
      res.status(403).send('403 Forbidden');

      return;
    }

    const userId = user.id;

    const err = await acceptRentalRequest({
      characterId,
      requestId,
      userId,
    });

    if (err) {
      res.status(400).send(err);

      return;
    }

    res.send(1);
  },

  async decline({ data, res, spark } = emptyObj) {
    validate(data, {
      characterId: STRING,
      requestId: STRING,
    });

    const { user } = spark;

    if (!user) {
      res.status(401).send('401 Unauthorized');

      return;
    }

    const { characterId, requestId } = data;

    const character = await Character.collection.findOne({
      _id: characterId,
    }, {
      projection: {
        _id: 1,
        owner: 1,
        userId: 1,
      },
    });

    if (!character) {
      res.status(404).send('404 - Character Not Found');

      return;
    }

    const { owner } = character;

    const allow = hasAccess({
      action: SET,
      item: {
        userId: owner || character.userId,
      },
      type: CHARACTER,
      user,
    });

    if (!allow) {
      res.status(403).send('403 Forbidden');

      return;
    }

    const request = await RentalRequest.collection.findOne({
      _id: requestId,
      characterId,
    }, {
      projection: {
        _id: 1,
        owner: 1,
        taker: 1,
      },
    });

    if (!request) {
      res.status(404).send('404 - Request Not Found');

      return;
    }

    const { taker } = request;

    const userId = user.id;

    await RentalRequest.collection.updateOne({
      _id: requestId,
    }, {
      $set: {
        accepted: null,
        declined: new Date(),
        owner: userId,
      },
    });

    const subs = [
      `rentalRequests?userId=${taker}`,
      `rentalRequests?userId=${userId}`,
    ];

    if (userId !== request.owner) {
      subs.push(`rentalRequests?userId=${request.owner}`);
    }

    global.updateSub(subs);

    res.send(1);
  },

  async unrent({ data, res, spark } = emptyObj) {
    validate(data, {
      characterId: STRING,
    });

    const { user } = spark;

    if (!user) {
      res.status(401).send('401 Unauthorized');

      return;
    }

    const { characterId } = data;

    const character = await Character.collection.findOne({
      _id: characterId,
    }, {
      projection: {
        _id: 1,
        owner: 1,
        taker: 1,
        userId: 1,
      },
    });

    if (!character) {
      res.status(404).send('404 - Character Not Found');

      return;
    }

    const userId = user.id;

    const { owner, taker } = character;

    const allow = hasAccess({
      action: ADMIN,
      type: CHARACTER,
      item: character,
      user,
    });

    if (!allow && taker !== userId) {
      res.status(403).send('403 Forbidden');

      return;
    }

    const weapons = await UsersWeapons.findAll({
      characterId,
      userId,
    }, {
      projection: {
        _id: 1,
        type: 1,
        weaponId: 1,
      },
    });

    let processedWeapons;
    if (weapons.length !== 0) {
      processedWeapons = true;
    }

    await Promise.all([
      Character.collection.updateOne({
        _id: characterId,
      }, {
        $set: {
          maker: null,
          rentedUntil: null,
          taker: null,
          userId: owner,
        },
      }),
      // ...map(weapons, (w) => {
      //   const { type, weaponId } = w;
      //
      //   return unequipWeapon({
      //     _id: characterId,
      //     type,
      //     user,
      //     weaponId,
      //   });
      // }),
    ]);

    const subs = [
      `character?characterId=${characterId}`,
      `characters?userId=${owner}`,
      `characters?userId=${userId}`,
      'charactersForRent?',
      `ownedCharacters?userId=${owner}`,
    ];

    if (processedWeapons) {
      subs.push(`myWeapons?userId=${userId}`);
    }

    global.updateSub(subs);

    res.send(1);
  },
};
