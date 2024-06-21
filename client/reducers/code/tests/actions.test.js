import {
  codeReducer,
  setCode,
  setCodes,
} from '../actions';

describe('Code actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(codeReducer).not.toThrow();
    expect(setCode).not.toThrow();
    expect(setCodes).not.toThrow();
  });
});
