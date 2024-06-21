import {
  getCodes,
  getPromoCode,
} from '../selectors';

describe('Code selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getCodes).not.toThrow();
    expect(getPromoCode).not.toThrow();
  });
});
