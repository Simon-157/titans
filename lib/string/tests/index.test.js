import { cleanString, escapeRegExp, sanitizeString } from '..';

describe('String library', () => {
  it('Should not throw errors with emprty arguments', () => {
    expect(cleanString).not.toThrow();
    expect(escapeRegExp).not.toThrow();
    expect(sanitizeString).not.toThrow();
  });

  it('Should properly sanitize a string', () => {
    expect(sanitizeString()).toBe('');
    expect(sanitizeString('%')).toBe('%');
    expect(sanitizeString(' Test%20  TEST  test   ')).toBe('test test test');
  });

  it('Should properly escape a regExp', () => {
    expect(escapeRegExp()).toBe('');
    expect(escapeRegExp('test.\\+*?[^]$(){}=!<>|:-')).toBe('test\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-');
  });
});
