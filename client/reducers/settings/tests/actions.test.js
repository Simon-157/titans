import {
  setSettings,
  settingsReducer,
} from '../actions';

describe('Settings actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(setSettings).not.toThrow();
    expect(settingsReducer).not.toThrow();
  });
});
