import Loadable from 'react-loadable';
import { BAR, BARS, EVENT, EVENTS, EXPLORE, FAQ, HOME, RENT, TITANS } from 'defaults';
import LoadingBar from 'components/LoadingBar';
import Bar from 'pages/Bar';
import Bars from 'pages/Bars';
import Event from 'pages/Event';
import Events from 'pages/Events';
import Explore from 'pages/Explore';
import Faq from 'pages/FAQ';
import Home from 'pages/Home';
import RentTitan from 'pages/RentTitan';
import UserTitans from 'pages/UserTitans';
import QRPage from 'pages/QR';
import Rentals from 'pages/Rentals';
import TournamentLeaderBoard from 'pages/TournamentLeaderBoard';
import EventsPage from '../pages/EventsPage';
import SingleEventPage from '../pages/EventPage';

const Profile = Loadable({
  loader: () => import('pages/Profile'),
  loading: LoadingBar,
  delay: 0,
});

const DiscordLoginCallback = Loadable({
  loader: () => import('components/SocialLogin/DiscordLoginCallback'),
  loading: LoadingBar,
  delay: 0,
});

const ResetPassword = Loadable({
  loader: () => import('pages/ResetPassword'),
  loading: LoadingBar,
  delay: 0,
});

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    name: HOME,
  },
  {
    path: '/index',
    component: Home,
    exact: true,
    name: HOME,
  },
  {
    path: '/bars',
    component: Bars,
    exact: true,
    name: BARS,
    tab: BARS,
  },
  {
    path: '/bar/:shortUrl',
    component: Bar,
    name: BAR,
    tab: BARS,
  },
  {
    path: '/explore/:page?',
    component: Explore,
    exact: true,
    name: EXPLORE,
  },
  {
    path: '/event/:shortUrl',
    component: Event,
    exact: true,
    name: EVENT,
    tab: EVENTS,
  },
  {
    path: '/events',
    component: Events,
    exact: true,
    name: EVENTS,
    tab: EVENTS,
  },
  {
    path: '/faq',
    component: Faq,
    exact: true,
    name: FAQ,
  },
  {
    path: '/profile',
    component: Profile,
    exact: true,
  },
  {
    path: '/rent-titan/:tab(titans|requests)?',
    component: Rentals,
    exact: true,
    name: 'rentals',
  },
  {
    path: '/tournament-leaderboard',
    component: TournamentLeaderBoard,
    exact: true,
    name: 'leaderboard',
  },
  {
    path: '/rent-titan/:characterId(\\d+)',
    component: RentTitan,
    exact: true,
    name: RENT,
  },
  {
    path: '/user-titans/:userId',
    component: UserTitans,
    exact: true,
    name: TITANS,
  },
  {
    path: '/discord-login-callback',
    component: DiscordLoginCallback,
    exact: true,
  },
  {
    path: '/passwordreset/:token',
    component: ResetPassword,
    exact: true,
  }, {
    path: '/qr/:code?',
    component: QRPage,
    exact: true,
  },

  {
    path: '/test/all',
    component: EventsPage,
    exact: true,
    name: EVENTS,
  },

  {
    path: '/test/all/:id',
    component: SingleEventPage,
    name: EVENT,
  },

  {
    path: '/blogs',
    component: Loadable({
      loader: () => import('pages/BlogsPage'),
      loading: LoadingBar,
      delay: 0,
    }),
  },

   {
    path: '/blog/:blogId',
    component: Loadable({
      loader: () => import('pages/BlogPage'),
      loading: LoadingBar,
      delay: 0,
    }),
  },
  {
    path: '/cafes',
    component: Loadable({
      loader: () => import('pages/CafesPage'),
      loading: LoadingBar,
      delay: 0,
    }),
  }

];

export default routes;
