import {
  confirmEmail,
  forgotPassword,
  importFunc,
  isValidToken,
  loginFunc,
  resetPassword,
  registerFunc,
} from '../sso';

describe('SSO middlewares', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(confirmEmail).not.toThrow();
    expect(forgotPassword).not.toThrow();
    expect(importFunc).not.toThrow();
    expect(isValidToken).not.toThrow();
    expect(loginFunc).not.toThrow();
    expect(resetPassword).not.toThrow();
    expect(registerFunc).not.toThrow();
  });
});
