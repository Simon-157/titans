import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import get from 'lodash/get';
import set from 'lodash/set';
import {
  title,
  ACTIVE_SEASON,
  GET_CURRENT,
  ID,
  JWT,
  STORAGE,
  USER,
} from 'defaults';
import i18n from 'lib/i18n';
import { requestTranslation } from 'lib/i18n/requestTranslation';
import { withSub } from 'client/lib/sub';
import { executePrimusRequest } from 'client/request';
import Alerts from 'components/Alerts';
import ErrorBoundary from 'components/ErrorBoundary';
import Outdated from 'components/Outdated';
import Routes from 'pages/Routes';
import { getCurrentUser } from 'reducers/user/selectors';
import { setCurrentUser as setCurrentUserAction } from 'reducers/user/actions';
import { isOutdated } from './isOutdated';

class Root extends Component {
  static displayName = 'Root'

  static propTypes = {
    lang: PropTypes.string,
    userId: PropTypes.string,
    setCurrentUser: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const { lang, userId } = props;

    if (global.__CLIENT__) {
      window.addEventListener(STORAGE, this.storage);

      this.outdated = isOutdated();
    }

    if (userId) {
      this.getUser();
    }

    if (global.__CLIENT__) {
      requestTranslation(lang);
    }
  }

  componentWillUnmount() {
    window.removeEventListener(STORAGE, this.storage);
  }

  storage = (ev) => {
    if (ev.key === JWT) {
      const { jwt } = ev.storageArea;

      const user = decode(jwt);

      if (user) {
        const { setCurrentUser } = this.props;

        delete user.iat;
        delete user.exp;

        set(user, [JWT], jwt);

        setCurrentUser(user);
      }
    }
  }

  // Get user data as his role might have changed since jwt login
  getUser() {
    this.gettingUser = true;

    executePrimusRequest(GET_CURRENT, USER, this.userCb);
  }

  userCb = (err, data) => {
    this.gettingUser = false;

    const user = get(data, [USER]);

    if (user) {
      this.props.setCurrentUser(user);
    }
  }

  render() {
    const { outdated } = this;

    if (outdated) {
      return (
        <Outdated />
      );
    }

    return (
      <ErrorBoundary>

        <Helmet>

          <meta charSet={'utf-8'} />

          <meta
            name={'viewport'}
            content={'width=device-width, initial-scale=1'}
          />

          <title>
            {title}
          </title>

          {null
            // <meta
            //   name={DESCRIPTION}
            //   content={desc}
            // />
            //
            // <meta
            //   name={KEYWORDS}
            //   content={keywords}
            // />
          }

          <meta property={'og:type'} content={'website'} />

          <meta property={'og:site_name'} content={title} />

          <meta property={'og:url'} content={`https://${process.env.HOSTNAME || 'reignoftitans.gg'}`} />

          <meta
            property={'og:title'}
            content={title}
          />

          {null
            // <meta
            //   property={'og:description'}
            //   content={t([MAIN, DESC])}
            // />
            //
            // <meta
            //   property={'og:image'}
            //   content={img}
            // />
          }

          <meta
            name={'twitter:title'}
            content={title}
          />

          {null
            // <meta
            //   name={'twitter:description'}
            //   content={desc}
            // />
            //
            // <meta
            //   name={'twitter:image'}
            //   content={img}
            // />
          }

          <meta name={'mobile-web-app-capable'} content={'yes'} />

          <meta name={'apple-mobile-web-app-capable'} content={'yes'} />

          <meta name={'apple-mobile-web-app-title'} content={title} />

          <link rel={'canonical'} href={`https://${process.env.HOSTNAME || 'reignoftitans.gg'}`} />

        </Helmet>

        <Routes />

        <Alerts />

      </ErrorBoundary>
    );
  }
}

export default withSub(withRouter(i18n(Root)), function rootWithSub() {
  // Keep the activeSeason sub so we can have an update when sending remove records
  return [{
    name: ACTIVE_SEASON,
  }];
}, function mapStateToProps(state) {
  const user = getCurrentUser(state);

  const userId = get(user, [ID]);

  return {
    userId,
  };
}, {
  setCurrentUser: setCurrentUserAction,
});
