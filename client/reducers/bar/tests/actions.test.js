import {
  barReducer,
  setBar,
  setBars,
} from '../actions';

describe('Bar actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(barReducer).not.toThrow();
    expect(setBar).not.toThrow();
    expect(setBars).not.toThrow();
  });
});
