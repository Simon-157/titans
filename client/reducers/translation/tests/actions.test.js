import {
  translationReducer,
  setTranslation,
  setTranslations,
} from '../actions';

describe('Translation actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(translationReducer).not.toThrow();
    expect(setTranslation).not.toThrow();
    expect(setTranslations).not.toThrow();
  });
});
