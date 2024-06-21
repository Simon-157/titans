import React from 'react';
import { render } from 'react-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'client/lib/console';
import '@solana/wallet-adapter-react-ui/styles.css';
import AppWithWallets from './AppWithWallets';

dayjs.extend(utc);

const app = document.getElementById('app');

const init = () => {
  render(
    <AppWithWallets />,
    app,
  );

  if (module.hot) {
    module.hot.accept();
  }
};

init();

if (process.env.GTM) {
  (function GTM(w, d, s, l, i) {
    w[l] = w[l] || []; // eslint-disable-line
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s);
    const dl = l !== 'dataLayer' ? `&l=${l}` : '';
    j.async = true;
    j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
    f.parentNode.insertBefore(j, f);
  }(window, document, 'script', 'dataLayer', process.env.GTM));
}

if (process.env.BUILD_TIME) {
  global.buildTime = process.env.BUILD_TIME;
}
