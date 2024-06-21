import isArray from 'lodash/isArray';
import { EVENT_ATTENDANCE } from 'defaults';
import { registerResponseMessage } from 'client/request';
import { setEventAttendance, setEventAttendances } from './actions';

registerResponseMessage(EVENT_ATTENDANCE, function registerEventAttendanceResponse(store, data) {
  if (isArray(data.data)) {
    if (data.data.length === 1) {
      store.dispatch(setEventAttendance(data.data[0]));

      return;
    }

    store.dispatch(setEventAttendances(data.data));

    return;
  }

  store.dispatch(setEventAttendance(data.data));
});
