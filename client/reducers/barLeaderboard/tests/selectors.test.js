import {
  getLeaderboards,
  getBarLeaderboard,
} from '../selectors';

describe('BarLeaderboard selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getLeaderboards).not.toThrow();
    expect(getBarLeaderboard).not.toThrow();
  });
});
