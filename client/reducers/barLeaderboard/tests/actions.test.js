import {
  barLeaderboardReducer,
  setBarLeaderboard,
  setBarLeaderboards,
} from '../actions';

describe('BarLeaderboard actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(barLeaderboardReducer).not.toThrow();
    expect(setBarLeaderboard).not.toThrow();
    expect(setBarLeaderboards).not.toThrow();
  });
});
