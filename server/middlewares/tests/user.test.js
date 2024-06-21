import { editUser, getUser } from '../user';

describe('User middlewares', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(editUser).not.toThrow();
    expect(getUser).not.toThrow();
  });
});
