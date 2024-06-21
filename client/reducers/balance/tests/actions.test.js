import {
  balanceReducer,
  editBalance,
  saveBalance,
  setBalance,
  setBalances,
} from '../actions';

describe('Balance actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(balanceReducer).not.toThrow();
    expect(editBalance).not.toThrow();
    expect(saveBalance).not.toThrow();
    expect(setBalance).not.toThrow();
    expect(setBalances).not.toThrow();
  });
});
