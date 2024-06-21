import {
  characterReducer,
  setCharacter,
  setCharacters,
} from '../actions';

describe('Character actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(characterReducer).not.toThrow();
    expect(setCharacter).not.toThrow();
    expect(setCharacters).not.toThrow();
  });
});
