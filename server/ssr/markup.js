import { Helmet } from 'react-helmet';
import set from 'lodash/set';
import { getMarkup } from 'client/ssr';

const noIndex = '<meta name="robots" content="noindex"><meta name="googlebot" content="noindex">';

export default function SSRMarkup({ req = {}, res = {}, test } = {}) {
  const { _parsedUrl, store, url } = req;

  const { pathname } = _parsedUrl;

  if (!req.activeRoute) {
    res.statusCode = 404;
  }

  if (res.statusCode === 404) {
    set(req, ['dynamicHead'], noIndex);
    set(req, ['dynamicBody'], `<div id="app"></div><script>window.__STATUS_CODE__={"${pathname}":404};</script>`);

    return;
  }

  if (req.activeRouteName) {
    let markup;
    try {
      markup = getMarkup({ store, url });
    } catch (err) {
      console.log(err); // eslint-disable-line
      set(req, ['dynamicBody'], `<pre>${err.stack}</pre>`);

      return;
    }

    if (!test) {
      const helmet = Helmet.renderStatic();

      set(req, ['dynamicHead'], `${helmet.meta.toString()}${helmet.title.toString()}${helmet.link.toString()}`);
    }

    set(req, ['dynamicBody'], `<div id="app">${markup}</div>`);
  }
}
