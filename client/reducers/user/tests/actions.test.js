import {
  setCurrentUser,
  setUser,
  setUsers,
  userReducer,
} from '../actions';

describe('User actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(setCurrentUser).not.toThrow();
    expect(setUser).not.toThrow();
    expect(setUsers).not.toThrow();
    expect(userReducer).not.toThrow();
  });
});
