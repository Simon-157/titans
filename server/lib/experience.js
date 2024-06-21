import each from 'lodash/each';
import sumBy from 'lodash/sumBy';
import { AMOUNT } from 'defaults';
import { Experience } from 'collections';
import { levels } from 'lib/character';

export async function getCharacterExperience(characterId) {
  const experiences = await Experience.findAll({
    characterId,
  }, {
    projection: {
      _id: 1,
      amount: 1,
      characterId: 1,
      reason: 1,
    },
  });

  const experience = sumBy(experiences, AMOUNT);

  let level = 1;
  each(levels, (l) => {
    const { id, amount: levelAmount } = l;

    if (levelAmount <= experience) {
      level = id;
    } else {
      return false; // break from lodash/each
    }

    return true;
  });

  return { experience, level };
}

export default { getCharacterExperience };
