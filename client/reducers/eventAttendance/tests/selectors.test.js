import {
  getAllEventAttendances,
  getEventAttendances,
} from '../selectors';

describe('EventAttendance selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getAllEventAttendances).not.toThrow();
    expect(getEventAttendances).not.toThrow();
  });
});
