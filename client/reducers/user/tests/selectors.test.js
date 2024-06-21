import {
  getCurrentUser,
  getCurrentUserJWT,
  getUser,
  getUsers,
} from '../selectors';

describe('User selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getCurrentUser).not.toThrow();
    expect(getCurrentUserJWT).not.toThrow();
    expect(getUser).not.toThrow();
    expect(getUsers).not.toThrow();
  });
});
