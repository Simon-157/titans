import routes from '..';

describe('Routes for pages', () => {
  it('Should export an array of routes', () => {
    expect(Array.isArray(routes)).toBe(true);
  });
});
