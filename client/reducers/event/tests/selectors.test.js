import {
  getEvent,
  getEventByShortUrl,
  getEvents,
} from '../selectors';

describe('Event selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getEvent).not.toThrow();
    expect(getEventByShortUrl).not.toThrow();
    expect(getEvents).not.toThrow();
  });
});
