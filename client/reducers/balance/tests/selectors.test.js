import {
  getActiveBalance,
  getBalance,
  getBalances,
} from '../selectors';

describe('Balance selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getActiveBalance).not.toThrow();
    expect(getBalance).not.toThrow();
    expect(getBalances).not.toThrow();
  });
});
