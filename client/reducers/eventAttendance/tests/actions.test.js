import {
  eventAttendanceReducer,
  setEventAttendance,
  setEventAttendances,
} from '../actions';

describe('EventAttendance actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(eventAttendanceReducer).not.toThrow();
    expect(setEventAttendance).not.toThrow();
    expect(setEventAttendances).not.toThrow();
  });
});
