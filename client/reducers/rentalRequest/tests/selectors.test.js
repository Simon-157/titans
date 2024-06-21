import { getIncomingRequests, getOutgoingRequests } from '../selectors';

describe('Rental Request selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getIncomingRequests).not.toThrow();
    expect(getOutgoingRequests).not.toThrow();
  });
});
