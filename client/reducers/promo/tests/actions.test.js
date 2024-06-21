import {
  promoReducer,
  setPromo,
  setPromos,
} from '../actions';

describe('Promo actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(promoReducer).not.toThrow();
    expect(setPromo).not.toThrow();
    expect(setPromos).not.toThrow();
  });
});
