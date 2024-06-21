import { handleError } from '..';

const test = 'test';

describe('Error library', () => {
  it('Should not throw an error', () => {
    expect(handleError).not.toThrow();
  });

  it('Should handle error', () => {
    expect(handleError()).toBe('');
    expect(handleError({
      message: test,
    })).toBe(test);
  });
});
