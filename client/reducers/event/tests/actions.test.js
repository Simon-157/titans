import {
  eventReducer,
  setEvent,
  setEvents,
} from '../actions';

describe('Event actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(eventReducer).not.toThrow();
    expect(setEvent).not.toThrow();
    expect(setEvents).not.toThrow();
  });
});
