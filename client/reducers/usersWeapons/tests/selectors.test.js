import { getUserWeapons } from '../selectors';

describe('User Weapon selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getUserWeapons).not.toThrow();
  });
});
