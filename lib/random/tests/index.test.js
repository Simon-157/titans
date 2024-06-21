import { randomId, secret } from '..';

describe('Random library', () => {
  it('Should generate random id', () => {
    expect(randomId().length).toBe(17);
  });

  it('Should generate secret string', () => {
    expect(secret().length).toBe(43);
  });
});
