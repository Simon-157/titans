import { assignLootboxes } from '../lootbox';

describe('Lootbox library', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(assignLootboxes).not.toThrow();
  });
});
