import {
  getLootboxes,
  getUserLootbox,
} from '../selectors';

describe('Lootbox selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getLootboxes).not.toThrow();
    expect(getUserLootbox).not.toThrow();
  });
});
