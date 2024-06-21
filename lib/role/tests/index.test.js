import { hasAccess } from '..';

describe('Role library', () => {
  it('Should not throw an error', () => {
    expect(hasAccess).not.toThrow();
  });

  it('Should allow/deny translation in different cases', () => {
    expect(hasAccess({
      action: 'set',
      user: {
        role: 'user',
      },
      type: 'user',
    })).toBe(false);

    expect(hasAccess({
      action: 'set',
      user: {
        role: 'admin',
      },
      type: 'translation',
    })).toBe(true);
  });
});
