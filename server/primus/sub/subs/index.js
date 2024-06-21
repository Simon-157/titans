import each from 'lodash/each';
import balance from '../balance';
import bar from '../bar';
import barLeaderboard from '../barLeaderboard';
import character from '../character';
import city from '../city';
import code from '../code';
import event from '../event';
import global from '../global';
import lootbox from '../lootbox';
import rentalRequest from '../rentalRequest';
import season from '../season';
import settings from '../settings';
import user from '../user';
import weapon from '../weapon';

const subs = {};

each({
  ...balance,
  ...bar,
  ...barLeaderboard,
  ...character,
  ...city,
  ...city,
  ...code,
  ...event,
  ...global,
  ...lootbox,
  ...rentalRequest,
  ...season,
  ...settings,
  ...user,
  ...weapon,
}, (func, name) => {
  subs[name] = func;
});

export default subs;
