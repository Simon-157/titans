import React from 'react';
import PropTypes from 'prop-types';
import { BAR, PRODUCTION } from 'defaults';
import i18n from 'lib/i18n';
import { withSub } from 'client/lib/sub';
import NotFound from 'pages/NotFound';
import LoadingBar from 'components/LoadingBar';
import { getBarByShortUrl } from 'reducers/bar/selectors';
import { getCurrentUser } from 'reducers/user/selectors';
import BarContent from './BarContent';

function BarPage(props) {
  const {
    bar,
    history,
    loadedSubs,
    location,
    match: { params: { shortUrl } },
    userId,
    t,
  } = props;

  const barId = bar?._id;

  if (!barId) {
    if (global.__CLIENT__ && !loadedSubs[`bar?shortUrl=${shortUrl}`]) {
      return <LoadingBar />;
    }

    if (process.env.NODE_ENV !== PRODUCTION && !process.env.SSR) {
      return <NotFound />;
    }
  }

  return (
    <BarContent
      history={history}
      location={location}
      bar={bar}
      barId={barId}
      userId={userId}
      t={t}
    />
  );
}

BarPage.displayName = 'BarPage';

BarPage.propTypes = {
  bar: PropTypes.object,
  history: PropTypes.object,
  loadedSubs: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  userId: PropTypes.string,
  t: PropTypes.func,
};

export default withSub(i18n(BarPage), function barSub({
  match: { params: { shortUrl } },
}) {
  return [{
    name: BAR,
    props: {
      shortUrl,
    },
  }];
}, function mapStateToProps(state, { match: { params: { shortUrl } } }) {
  const user = getCurrentUser(state);
  const userId = user?.id;

  return {
    bar: getBarByShortUrl(state, shortUrl),
    userId,
  };
});
