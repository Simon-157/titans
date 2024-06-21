import {
  getCharacter,
  getCharacters,
  getUserCharacters,
} from '../selectors';

describe('Character selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getCharacter).not.toThrow();
    expect(getCharacters).not.toThrow();
    expect(getUserCharacters).not.toThrow();
  });
});
