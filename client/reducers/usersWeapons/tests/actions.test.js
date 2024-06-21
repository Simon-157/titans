import {
  setUserWeapon,
  setUserWeapons,
  usersWeaponsReducer,
} from '../actions';

describe('User Weapon actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(setUserWeapon).not.toThrow();
    expect(setUserWeapons).not.toThrow();
    expect(usersWeaponsReducer).not.toThrow();
  });
});
