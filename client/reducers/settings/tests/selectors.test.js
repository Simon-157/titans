import { getUserSettings } from '../selectors';

describe('Settings selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getUserSettings).not.toThrow();
  });
});
