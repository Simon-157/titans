import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import intersection from 'lodash/intersection';
import orderBy from 'lodash/orderBy';
import size from 'lodash/size';
import {
  emptyArr,
  emptyObj,
  ASC,
  BASE_VAL,
  CLASS_NAME,
  DATE,
  DESC,
  DISTANCE,
  POSITION,
  START_AT,
} from 'defaults';

export function getClassNames(el) {
  return (
    get(el, [CLASS_NAME, BASE_VAL]) ||
    get(el, [CLASS_NAME]) ||
    ''
  ).toString().split(' ');
}

export function isInside(el = emptyObj, classNames = emptyArr, levelOfDepth = 1000) {
  // exception for an element which has been removed from DOM on click
  if (!el.parent && el !== document) {
    return true;
  }

  if (intersection(getClassNames(el), classNames).length === classNames.length) {
    return true;
  }

  if (levelOfDepth === 0) {
    return false;
  }

  return el.parentNode && isInside(el.parentNode, classNames, levelOfDepth - 1);
}

function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
}

export function addClass(el, className) {
  if (!el || !className) {
    return;
  }

  if (!hasClass(el, className)) {
    // eslint-disable-next-line no-param-reassign
    el.className += ` ${className}`;
  }
}

export function removeClass(el, className) {
  if (!el || !className) {
    return;
  }

  if (hasClass(el, className)) {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
    // eslint-disable-next-line no-param-reassign
    el.className = el.className.replace(reg, ' ');
  }
}

export const MOBILE_BREAKPOINT = 899;
export const TABLET_BREAKPOINT = 1199;
export const DESKTOP_SMALL_BREAKPOINT = 1599;

export const LAYOUT_TYPE = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP_SMALL: 'desktopSmall',
  DESKTOP: 'desktop',
};

export const getLayoutType = () => {
  const { innerWidth } = global;
  if (innerWidth <= MOBILE_BREAKPOINT) {
    return LAYOUT_TYPE.MOBILE;
  } if (innerWidth <= TABLET_BREAKPOINT) {
    return LAYOUT_TYPE.TABLET;
  } if (innerWidth <= DESKTOP_SMALL_BREAKPOINT) {
    return LAYOUT_TYPE.DESKTOP_SMALL;
  }
  return LAYOUT_TYPE.DESKTOP;
};

function addParents(result, tree, page) {
  if (page.parent) {
    const parent = find(tree, (item) => {
      return item.id === page.parent;
    });

    result.push(parent);

    addParents(result, tree, parent);
  }
}

export function findWithParents(tree, name) {
  const page = find(tree, (item) => {
    return item.id === name;
  });

  if (!page) {
    return emptyArr;
  }

  const result = [page];

  addParents(result, tree, page);

  return result.reverse();
}

const paramRegExp = /(:[\w()\\+*.?]+)+/g;

export function replaceParams(str, fields) {
  return str.replace(paramRegExp, (key) => {
    return fields[key.substring(1)];
  });
}

export function preventDefault(ev) {
  ev.preventDefault();
}

export function dataLayerPush(obj) {
  const { dataLayer } = global;

  if (dataLayer) {
    dataLayer.push(obj);
  }
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getDistance(cord1, cord2) {
  const { lat: lat1, lng: lng1 } = cord1;
  const { lat: lat2, lng: lng2 } = cord2;

  if ((lat1 === '0' && lng1 === '0') || (lat2 === '0' && lng2 === '0')) {
    return 0.009;
  }

  const R = 6371; // Radius of the earth in km

  const dLat = deg2rad(lat2 - lat1); // deg2rad below

  const dLon = deg2rad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // Distance in km

  return d / 1.609244;
}

export function getBarImg(_, int) {
  const url = `/img/cooldown-placeholder-${int}.jpg`;

  return `${process.env.CORDOVA && url.indexOf('/') === 0 ? '.' : ''}${url}`;
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');

    if (successful) {
      // AlertStore.success(t([GENERAL, SUCCESS, TITLE]));
    } else {
      // AlertStore.error(ERROR);
    }
  } catch (err) {
    // AlertStore.error(err);
  }

  document.body.removeChild(textArea);
}

export function copyText(text) {
  if (!navigator.clipboard) {
    fallbackCopyText(text);
    return;
  }

  navigator.clipboard.writeText(text).then(function writeTextCb() {
    // AlertStore.success(t([GENERAL, SUCCESS, TITLE]));
  }, function writeTextErr() {
    // AlertStore.error(err);
  });
}

export function prepareWithPinned(data = emptyObj, {
  latLng,
  past = false,
} = emptyObj) {
  const { events, pinned, news } = data;

  let sortedItems;

  if (events) {
    const timeOrder = past ? DESC : ASC;

    sortedItems = latLng ?
      orderBy(events, [DISTANCE, START_AT], [ASC, timeOrder]) :
      orderBy(events, START_AT, timeOrder);
  } else {
    sortedItems = orderBy(news, DATE, DESC);
  }

  if (size(pinned) === 0) {
    return sortedItems;
  }

  const sortedPinned = orderBy(pinned, POSITION, ASC);

  const comparator = sortedPinned.length;

  for (let i = 0; i < comparator; i++) {
    const pin = sortedPinned[i];

    sortedItems.splice(pin.position, 0, pin);
  }

  return sortedItems;
}

export function renderLine(line, key) {
  return (
    <div key={key}>
      {line}
    </div>
  );
}
