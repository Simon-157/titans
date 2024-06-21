import {
  lootboxReducer,
  setLootbox,
  setLootboxes,
} from '../actions';

describe('Lootbox actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(lootboxReducer).not.toThrow();
    expect(setLootbox).not.toThrow();
    expect(setLootboxes).not.toThrow();
  });
});
