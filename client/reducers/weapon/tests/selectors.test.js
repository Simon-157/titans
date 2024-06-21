import { getWeapons } from '../selectors';

describe('Weapon selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getWeapons).not.toThrow();
  });
});
