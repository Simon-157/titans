import {
  CHARACTER,
  GET,
  LOOTBOX,
  USER,
  WEAPON,
} from 'defaults';
import { hasAccess } from 'lib/role';

export default {
  character({ props, user }) {
    return hasAccess({
      action: GET,
      item: props,
      type: CHARACTER,
      user,
    });
  },
  characters({ props, user }) {
    return hasAccess({
      action: GET,
      item: props,
      type: CHARACTER,
      user,
    });
  },
  lootboxes({ props, user }) {
    return hasAccess({
      action: GET,
      item: props,
      type: LOOTBOX,
      user,
    });
  },
  rentalRequests({ props, user }) {
    return hasAccess({
      action: GET,
      item: props,
      type: CHARACTER,
      user,
    });
  },
  settings({ props, user }) {
    return hasAccess({
      action: GET,
      item: props,
      type: CHARACTER,
      user,
    });
  },
  userAccounts({ props, user }) {
    return hasAccess({
      action: GET,
      item: props,
      type: USER,
      user,
    });
  },
  userValues({ props, user }) {
    return hasAccess({
      action: GET,
      item: props,
      type: USER,
      user,
    });
  },
  myWeapons({ props, user }) {
    return hasAccess({
      action: GET,
      item: props,
      type: WEAPON,
      user,
    });
  },
};
