import {
  getPromo,
  getPromos,
} from '../selectors';

describe('Promo selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getPromo).not.toThrow();
    expect(getPromos).not.toThrow();
  });
});
