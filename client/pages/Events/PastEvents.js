import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import {
  emptyArr,
  EVENTS,
  H1_LARGE,
  HOUR,
  PAST,
} from 'defaults';
import i18n from 'lib/i18n';
import { withSub } from 'client/lib/sub';
import FeaturedItem from 'components/FeaturedBlock/FeaturedItem';
import { getPastEvents } from 'reducers/event/selectors';
import styles from './css/styles.css';

class PastEvents extends Component {
  static displayName = 'PastEvents'

  static propTypes = {
    events: PropTypes.array,
    title: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.string]),
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  static defaultProps = {
    title: [EVENTS, PAST],
  }

  events = emptyArr

  constructor(props) {
    super(props);

    const { events } = props;

    this.prevProps = events;

    this.prepare(events);
  }

  shouldComponentUpdate(newProps) {
    const { events } = newProps;

    const equals = isEqual(this.prevProps, events);

    if (!equals) {
      this.prevProps = events;

      this.prepare(events);
    }

    return !equals;
  }

  prepare(events) {
    if (!events) {
      return;
    }

    this.events = events;
  }

  renderItem = (item) => {
    const { userId, t } = this.props;

    const { _id } = item;

    return (
      <FeaturedItem
        key={_id}
        entity={EVENTS}
        item={item}
        userId={userId}
        t={t}
        fade
      />
    );
  }

  render() {
    if (!this.events.length) {
      return null;
    }

    const { title, t } = this.props;

    return (
      <>

        {title && (
          <h2 className={H1_LARGE}>
            {t(title)}
          </h2>
        )}

        <div className={styles.grid}>
          {map(this.events, this.renderItem)}
        </div>

      </>
    );
  }
}

export default withSub(i18n(PastEvents), ({
  city,
  country,
  gameId,
  limit = 6,
  region,
}) => {
  const props = {};

  if (country) {
    props.country = country;

    if (city) {
      props.city = city;
    }
  } else if (region) {
    props.region = region;
  }

  if (gameId) {
    props.gameId = gameId;
  }

  return [{
    name: 'pastEvents',
    props,
    loadMore: {
      increment: limit,
      initial: limit,
    },
  }];
}, function mapStateToProps(state) {
  return {
    events: getPastEvents(state, { now: dayjs.utc().add(1, HOUR) }),
  };
});
