import {
  DAMAGE,
  IMMEDIATE,
  LIFE_STEAL,
  TRUE_DAMAGE,
} from 'defaults';

export const calculateDamage = (scroll) => {
  const { effects = [] } = scroll;

  const damageTypes = [DAMAGE, LIFE_STEAL, TRUE_DAMAGE];

  let damage = 0;

  let effectsLength = effects.length;
  while (effectsLength-- > 0) {
    const effect = effects[effectsLength];

    const { effectType = DAMAGE, effectValue = 0, executionType = IMMEDIATE } = effect;

    if (
      damageTypes.indexOf(effectType) !== -1 &&
      executionType === IMMEDIATE
    ) {
      damage += effectValue;
    }
  }
  return damage;
};

export const scrollSizes = {
  XL: 'xl',
  L: 'l',
  M: 'm',
  S: 's',
  XS: 'xs',
};
