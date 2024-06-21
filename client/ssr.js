import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { emptyObj } from 'defaults';
import App from './app/index';

export function getMarkup({ store, url }) {
  return `${renderToString(
    <StaticRouter location={url} context={emptyObj}>
      <App store={store} />
    </StaticRouter>,
  )}`;
}
