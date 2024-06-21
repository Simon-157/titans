import produce, { enableES5 } from 'immer';
import { combineReducers } from 'redux-immer';
import { balanceReducer } from './balance';
import { barReducer } from './bar';
import { barLeaderboardReducer } from './barLeaderboard';
import { characterReducer } from './character';
import { codeReducer } from './code';
import { eventReducer } from './event';
import { eventAttendanceReducer } from './eventAttendance';
import { globalReducer } from './global';
import { promoReducer } from './promo';
import { rentalRequestReducer } from './rentalRequest';
import { settingsReducer } from './settings';
import { translationReducer } from './translation';
import { userReducer } from './user';
import { usersWeaponsReducer } from './usersWeapons';
import { weaponReducer } from './weapon';
import { lootboxReducer } from './lootbox';

enableES5();

export default combineReducers(produce, {
  balance: balanceReducer,
  bar: barReducer,
  barLeaderboard: barLeaderboardReducer,
  character: characterReducer,
  code: codeReducer,
  event: eventReducer,
  eventAttendance: eventAttendanceReducer,
  global: globalReducer,
  lootbox: lootboxReducer,
  promo: promoReducer,
  rentalRequest: rentalRequestReducer,
  settings: settingsReducer,
  translation: translationReducer,
  user: userReducer,
  usersWeapons: usersWeaponsReducer,
  weapon: weaponReducer,
});
