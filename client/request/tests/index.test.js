import { registerResponseMessage } from '../messages';

describe('Request messages', () => {
  it('Should register response message without errors', () => {
    expect(registerResponseMessage).not.toThrow();
  });
});
