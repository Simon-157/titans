import {
  setWeapon,
  setWeapons,
  weaponReducer,
} from '../actions';

describe('Weapon actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(setWeapon).not.toThrow();
    expect(setWeapons).not.toThrow();
    expect(weaponReducer).not.toThrow();
  });
});
