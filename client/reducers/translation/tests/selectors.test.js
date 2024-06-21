import {
  getKeys,
  getTranslation,
  getValue,
} from '../selectors';

describe('Translation selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getKeys).not.toThrow();
    expect(getTranslation).not.toThrow();
    expect(getValue).not.toThrow();
  });
});
