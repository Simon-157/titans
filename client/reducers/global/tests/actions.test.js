import {
  addError,
  addSuccess,
  globalReducer,
  setLang,
} from '../actions';

describe('Global actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(addError).not.toThrow();
    expect(addSuccess).not.toThrow();
    expect(globalReducer).not.toThrow();
    expect(setLang).not.toThrow();
  });
});
