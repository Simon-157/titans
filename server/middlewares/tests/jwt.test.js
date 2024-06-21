import { verifyToken, withToken, withUser } from '../jwt';

describe('JWT middlewares', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(verifyToken).not.toThrow();
    expect(withToken).not.toThrow();
    expect(withUser).not.toThrow();
  });
});
