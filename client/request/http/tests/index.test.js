import { executeHttpRequest } from '..';

describe('HTTP client side library', () => {
  it('Should not throw errors', () => {
    expect(executeHttpRequest).not.toThrow();
  });
});
