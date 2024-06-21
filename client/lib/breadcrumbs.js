import {
  BAR,
  BARS,
  EVENT,
  EVENTS,
  HOME,
} from 'defaults';

export default [
  {
    id: HOME,
    label: HOME,
    href: '/',
  },
  {
    id: BARS,
    label: 'bars.all',
    href: '/bars',
    parent: HOME,
  },
  {
    id: BAR,
    label: ':name',
    href: '/bar/:shortUrl',
    parent: BARS,
  },
  {
    id: EVENTS,
    label: 'events.all',
    href: '/events',
    parent: HOME,
  },
  {
    id: EVENT,
    label: ':title',
    href: '/event/:shortUrl',
    parent: EVENTS,
  },
];
