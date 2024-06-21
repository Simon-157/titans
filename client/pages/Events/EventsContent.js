import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  title as webSiteTitle,
  DESC,
  DISCOVER,
  EVENTS,
  KEY,
  TITLE,
} from 'defaults';
import Helmet from 'components/Helmet';
import EventsWrap from './EventsWrap';

class EventsContent extends Component {
  static displayName = 'UpcomingEvents'

  static propTypes = {
    location: PropTypes.object,
    t: PropTypes.func,
  }

  state = {}

  filter = (payload) => {
    this.setState(payload);
  }

  render() {
    const { location, t } = this.props;

    const { city, country, gameId } = this.state;

    return (
      <>

        <Helmet
          title={`${t([EVENTS, TITLE])} | ${webSiteTitle}`}
          description={t([EVENTS, DESC])}
          keywords={t([EVENTS, KEY])}
          link={`${location.origin}${location.pathname}`}
        />

        <EventsWrap
          city={city}
          country={country}
          gameId={gameId}
          filter={this.filter}
          t={t}
        />

        <div className={DISCOVER} />

      </>
    );
  }
}

export default EventsContent;
