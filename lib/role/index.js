import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import {
  emptyObj,
  ADMIN,
  BALANCE,
  BALANCER,
  BAR,
  CHARACTER,
  EVENT,
  EXPORT,
  GET,
  LOOTBOX,
  MASTER,
  MODERATOR,
  ROLE,
  SET,
  TRANSLATION,
  TRANSLATOR,
  USER,
  WEAPON,
} from 'defaults';

async function ownAccess(user, item = emptyObj) {
  return user.id === item.userId;
}

const entities = {
  [BALANCE]: {
    [GET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [BALANCER]: true,
    },
    [SET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [BALANCER]: true,
    },
  },
  [BAR]: {
    [GET]: {
      [MASTER]: true,
      [ADMIN]: true,
    },
    [SET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [MODERATOR]: ownAccess,
      [BALANCER]: ownAccess,
      [TRANSLATOR]: ownAccess,
      [USER]: ownAccess,
    },
  },
  [CHARACTER]: {
    [ADMIN]: {
      [MASTER]: true,
      [ADMIN]: true,
      [MODERATOR]: true,
    },
    [GET]: true,
    [SET]: ownAccess,
  },
  [EVENT]: {
    [GET]: {
      [MASTER]: true,
      [ADMIN]: true,
    },
    [SET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [MODERATOR]: ownAccess,
      [BALANCER]: ownAccess,
      [TRANSLATOR]: ownAccess,
      [USER]: ownAccess,
    },
  },
  [LOOTBOX]: {
    [GET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [MODERATOR]: ownAccess,
      [BALANCER]: ownAccess,
      [TRANSLATOR]: ownAccess,
      [USER]: ownAccess,
    },
  },
  [TRANSLATION]: {
    [GET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [BALANCER]: true,
      [TRANSLATOR]: true,
    },
    [SET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [BALANCER]: true,
      [TRANSLATOR]: true,
    },
  },
  [USER]: {
    [ADMIN]: {
      [MASTER]: true,
      [ADMIN]: true,
      [MODERATOR]: true,
    },
    [GET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [MODERATOR]: true,
      [BALANCER]: ownAccess,
      [TRANSLATOR]: ownAccess,
      [USER]: ownAccess,
    },
    [EXPORT]: {
      [MASTER]: true,
      [ADMIN]: true,
    },
  },
  [WEAPON]: {
    [GET]: {
      [MASTER]: true,
      [ADMIN]: true,
      [MODERATOR]: ownAccess,
      [BALANCER]: ownAccess,
      [TRANSLATOR]: ownAccess,
      [USER]: ownAccess,
    },
  },
};

export function hasAccess({
  action,
  item,
  type,
  user = emptyObj,
} = emptyObj) {
  const role = get(user, [ROLE]);

  if (!role) {
    return false;
  }

  const entity = get(entities, [type]);

  if (!entity) {
    return false;
  }

  if (!action || isBoolean(entity)) {
    return Boolean(entity);
  }

  if (isBoolean(entity[action])) {
    return entity[action];
  }

  if (isFunction(entity[action])) {
    return entity[action](user, item);
  }

  return get(entity, [action, role]) ?
    (isFunction(entity[action][role]) ?
      entity[action][role](user, item) :
      entity[action][role]) :
    false;
}
