import {
  getAlerts,
  getLang,
} from '../selectors';

describe('Global selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getAlerts).not.toThrow();
    expect(getLang).not.toThrow();
  });
});
