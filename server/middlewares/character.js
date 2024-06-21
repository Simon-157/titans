import { get } from 'axios';
import each from 'lodash/each';
import isString from 'lodash/isString';
import kebabCase from 'lodash/kebabCase';
import pick from 'lodash/pick';
import set from 'lodash/set';
import { Character } from 'collections';
import { addWeaponScrolls, characterAggregation } from '../lib/character';
import { getCharacterExperience } from '../lib/experience';
import { response, withResponse } from '../util/response';
import { translateDna } from '../util/titan';

const bodyParts = [
  'armsExtra',
  'back',
  'baseColor',
  'belt',
  'bodyColor',
  'bracelets',
  'clothDown',
  'clothUp',
  'ears',
  'eyeBrows',
  'eyes',
  'hair',
  'hairColor',
  'headColor',
  'horns',
  'leftHand',
  'mouth',
  'rightHand',
  'scarsArms',
  'scarsFace',
  'shoes',
  'skinArms',
  'skinBody',
  'skinHead',
];

export default function addCharacterMiddleware(router) {
  router.get('/getCharacter/:_id', withResponse(async function getCharacter(req, res) {
    const { _id } = req.params;

    if (!_id) {
      response('400 - CharacterId Required', res);

      return;
    }

    const character = await Character.aggregateOne([
      {
        $match: {
          _id,
        },
      },
      ...characterAggregation,
    ]);

    if (!character) {
      response('404 - Character Not Found', res);

      return;
    }

    await addWeaponScrolls(character);

    response(null, res, {
      character,
    });
  }));

  router.get('/getUserCharacters/:userId', withResponse(async function getUserCharacters(req, res) {
    const { userId } = req.params;

    if (!userId) {
      response('400 - UserId Required', res);

      return;
    }

    const character = await Character.collection.aggregate([
      {
        $match: {
          userId,
        },
      },
      ...characterAggregation,
    ]).toArray();

    await addWeaponScrolls(character);

    response(null, res, {
      character,
    });
  }));

  router.get('/charImg/:_id/:name?', withResponse(async function getCharacterImg(req, res) {
    const _id = req.params._id;

    const character = await Character.collection.findOne({
      _id,
    }, {
      projection: {
        _id: 1,
        dna: 1,
      },
    });

    res.header('Content-Type', 'image/svg+xml');
    res.header('Cache-Control', 'public, max-age=259200000');
    res.header('Expires', new Date(Date.now() + 259200000000).toUTCString());

    if (!character) {
      const { host } = req.headers;

      const image = `http://${host}/img/titan-placeholder.png`;

      res.header('Content-Type', 'image/png');

      const file = await get(image, {
        responseType: 'stream',
      });

      file.data.pipe(res);

      return;
    }

    const result = translateDna(character.dna, _id);

    res.send(`<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink"><image xlink:href="${result.img}" x="0" y="0" height="512px" width="512px"/></svg>`);
  }));

  router.get('/charImage/:_id/:name?', withResponse(async function getCharacterImg(req, res) {
    const _id = req.params._id;

    const character = await Character.collection.findOne({
      _id,
    }, {
      projection: {
        _id: 1,
        image: 1,
      },
    });

    if (!character) {
      res.status(404).sendStatus(404);

      return;
    }

    const { image } = character;

    if (!image) {
      // const { host } = req.headers;
      //
      // image = `http://${host}/img/titan-placeholder.png`;

      response('404 Not Found - Character Image Missing', res);

      return;
    }

    res.header('Content-Type', 'image/png');
    res.header('Cache-Control', 'public, max-age=259200000');
    res.header('Expires', new Date(Date.now() + 259200000000).toUTCString());

    const file = await get(image, {
      responseType: 'stream',
    });

    file.data.pipe(res);
  }));

  router.get('/getCharacterParts/:_id', withResponse(async function getCharacterImg(req, res) {
    const _id = req.params._id;

    // const character = await Character.collection.findOne({
    //   _id,
    // }, {
    //   projection: {
    //     _id: 1,
    //     dna: 1,
    //   },
    // });

    const character = await Character.aggregateOne([
      {
        $match: {
          _id,
        },
      },
      {
        $lookup: {
          from: 'usersWeapons',
          localField: '_id',
          foreignField: 'characterId',
          as: 'weapons',
        },
      },
      {
        $project: {
          _id: 1,
          dna: 1,
          weapons: {
            type: 1,
            weaponId: 1,
          },
        },
      },
    ]);

    if (!character) {
      res.status(404).sendStatus(404);

      return;
    }

    const { dna, weapons } = character;

    const translated = translateDna(dna, _id);

    const parts = pick(translated, bodyParts);

    each(parts, (item, key) => {
      if (isString(item) && item[0] !== '#') {
        set(parts, [key], kebabCase(item));
      }
    });

    response(null, res, {
      character: {
        ...parts,
        _id,
        weapons,
      },
    });
  }));

  router.get('/getCharacterExperience/:_id', withResponse(async function getCharacterExperienceRoute(req, res) {
    const _id = req.params._id;

    const { experience, level } = await getCharacterExperience(_id);

    response(null, res, {
      character: {
        _id,
        experience,
        level,
      },
    });
  }));
}
