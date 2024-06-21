import {
  getBar,
  getBarByShortUrl,
  getBars,
} from '../selectors';

describe('Bar selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getBar).not.toThrow();
    expect(getBarByShortUrl).not.toThrow();
    expect(getBars).not.toThrow();
  });
});
