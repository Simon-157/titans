import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import trim from 'lodash/trim';
import {
  emptyObj,
  CONTAINER,
  EVENT,
  H3_SMALL,
  KEY,
  LANG,
  MORE,
  PRODUCTION,
  title as webSiteTitle,
} from 'defaults';
import { randomIntFromInterval } from 'lib/random';
import i18n from 'lib/i18n';
import { withSub } from 'client/lib/sub';
import LoadingBar from 'components/LoadingBar';
import Breadcrumbs from 'components/Breadcrumbs';
import Helmet from 'components/Helmet';
import MoreEvents from 'components/MoreEvents';
import NotFound from 'pages/NotFound';
import { getEventByShortUrl } from 'reducers/event/selectors';
import { getCurrentUser } from 'reducers/user/selectors';
import EventContent from './EventContent';
import styles from './css/styles.css';

const updateProps = [EVENT, LANG, 'loadedSubs'];

class EventPage extends Component {
  static displayName = 'EventPage'

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    loadedSubs: PropTypes.object,
    event: PropTypes.object,
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  static defaultProps = {
    location: emptyObj,
  }

  img = `/img/cooldown-placeholder-${randomIntFromInterval(1, 11)}.jpg`

  constructor(props) {
    super(props);

    this.prevProps = pick(props, updateProps);
  }

  shouldComponentUpdate(newProps) {
    const newPrevProps = pick(newProps, updateProps);

    const equals = isEqual(this.prevProps, newPrevProps);

    if (!equals) {
      this.prevProps = newPrevProps;
    }

    return !equals;
  }

  render() {
    const {
      history,
      location,
      match: { params: { shortUrl } = emptyObj } = emptyObj,
      loadedSubs,
      event,
      userId,
      t,
    } = this.props;

    const eventId = event?._id;

    if (!eventId) {
      if (global.__CLIENT__ && !loadedSubs[`event?shortUrl=${shortUrl}`]) {
        return <LoadingBar />;
      }

      if (process.env.NODE_ENV !== PRODUCTION && !process.env.SSR) {
        return <NotFound />;
      }
    }

    const {
      _id,
      city,
      country,
      description,
      gameName,
      latitude,
      longitude,
      title,
    } = event || emptyObj;

    const seoTitle = `${title} - ${webSiteTitle}`;

    const img = get(event, ['bookingImage']) || this.img;

    return (
      <div className={styles.bg}>

        <Helmet
          title={seoTitle}
          description={trim(description)}
          keywords={`${t([EVENT, KEY])}${country ? `, ${country}` : ''}${city ? `, ${city}` : ''}${gameName ? `, ${gameName}` : ''}`}
          link={location.href}
          img={img}
          city={city}
          country={country}
          game={gameName}
        />

        <Breadcrumbs
          id={EVENT}
          shortUrl={shortUrl}
          title={title}
          t={t}
        />

        <div className={cx(CONTAINER, styles.container)}>
          <EventContent
            id={_id}
            history={history}
            event={event}
            userId={userId}
            t={t}
          />
        </div>

        <MoreEvents
          className={styles.moreEvents}
          eventId={_id}
          latLng={latitude && longitude ?
            `${latitude},${longitude}` :
            null
          }
          t={t}
        >
          <div className={cx(H3_SMALL, styles.moreTitle)}>
            {t([EVENT, MORE])}
          </div>
        </MoreEvents>

      </div>
    );
  }
}

export default withSub(i18n(EventPage), ({
  match: { params: { eventId, shortUrl } = emptyObj } = emptyObj,
}) => {
  const props = {};

  if (shortUrl) {
    props.shortUrl = shortUrl;
  } else {
    props.eventId = eventId;
  }

  return [{
    name: EVENT,
    props,
  }];
}, function mapStateToProps(state, { match: { params: { shortUrl } = emptyObj } = emptyObj }) {
  const user = getCurrentUser(state);
  const userId = user?.id;

  return {
    event: getEventByShortUrl(state, shortUrl),
    userId,
  };
});
