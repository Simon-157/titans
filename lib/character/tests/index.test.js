import { getAvailablePoints, getHealth, getMana } from '..';

describe('Character library', () => {
  it('Should not throw an error', () => {
    expect(getAvailablePoints).not.toThrow();
    expect(getHealth).not.toThrow();
    expect(getMana).not.toThrow();
  });

  it('Should calculate available character points', () => {
    expect(getAvailablePoints()).toBe(24);

    expect(getAvailablePoints({
      agility: 10,
      attack: 2,
      defense: 1,
      magicka: 1,
    })).toBe(10);

    expect(getAvailablePoints({
      agility: 11,
      attack: 2,
      defense: 1,
      magicka: 1,
    })).toBe(8);

    expect(getAvailablePoints({
      agility: 15,
      attack: 2,
      defense: 1,
      magicka: 1,
    })).toBe(0);

    expect(getAvailablePoints({
      agility: 12,
      attack: 3,
      defense: 2,
      magicka: 2,
    })).toBe(3);

    expect(getAvailablePoints({
      agility: 1,
      attack: 1,
      defense: 23,
      level: 3,
      magicka: 1,
    })).toBe(2);
  });

  it('Should calculate health', () => {
    expect(getHealth()).toBe(200);

    expect(getHealth({
      balance: {
        data: {
          hpLvlMultiplier: 20,
        },
      },
      character: {
        level: 10,
      },
    })).toBe(400);

    expect(getHealth({
      balance: {
        data: {
          hpDefMultiplier: 20,
          hpLvlMultiplier: 20,
        },
      },
      character: {
        level: 10,
        defense: 10,
      },
    })).toBe(420);

    expect(getHealth({
      balance: {
        data: {
          hpDefMultiplier: 20,
          hpLvlMultiplier: 20,
        },
      },
      character: {
        level: 10,
        defense: 21,
      },
    })).toBe(440);
  });

  it('Should calculate mana', () => {
    expect(getMana()).toBe(100);

    expect(getMana({
      balance: {
        data: {
          manaLvlMultiplier: 10,
        },
      },
      character: {
        level: 10,
      },
    })).toBe(200);

    expect(getMana({
      balance: {
        data: {
          manaLvlMultiplier: 10,
          manaMagMultiplier: 10,
        },
      },
      character: {
        level: 10,
        magicka: 10,
      },
    })).toBe(210);

    expect(getMana({
      balance: {
        data: {
          manaLvlMultiplier: 10,
          manaMagMultiplier: 10,
        },
      },
      character: {
        level: 10,
        magicka: 21,
      },
    })).toBe(220);
  });
});
