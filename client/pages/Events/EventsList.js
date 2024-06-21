import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import {
  emptyArr,
  BARS,
  // EVENT,
  EVENTS,
  // FILTER,
  FIND,
  // GAME,
  // GENERAL,
  H3_SMALL,
  HOUR,
  MESSAGE,
  RESIZE,
  STATUS,
  TITLE,
  UPCOMING_EVENTS,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { renderLine } from 'client/helpers';
import StatusMessage from 'components/StatusMessage';
import FeaturedItem from 'components/FeaturedBlock/FeaturedItem';
// import Featured from 'components/Featured';
import LogoCircle from 'components/LogoCircle';
// import Select from 'components/Select';
import { getUpcomingEvents } from 'reducers/event/selectors';
import styles from './css/styles.css';

class EventsList extends Component {
  static displayName = 'EventsList'

  static propTypes = {
    events: PropTypes.array, // eslint-disable-line
    // gameId: PropTypes.string,
    // games: PropTypes.array,
    title: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.string]),
    userId: PropTypes.string,
    prepare: PropTypes.func, // eslint-disable-line
    // setGame: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    title: [BARS, FIND],
  }

  state = {
    width: 1600,
  }

  events = emptyArr

  constructor(props) {
    super(props);

    this.prevProps = props;

    this.prepare(props);
  }

  ref = (c) => {
    this.c = c;
  }

  shouldComponentUpdate(newProps, newState) {
    const equals = isEqual(this.prevProps, newProps);

    if (!equals) {
      this.prevProps = newProps;

      this.prepare(newProps);
    }

    return !(equals && this.state.width === newState.width);
  }

  prepare(props) {
    const { events, prepare } = props;

    if (!events) {
      return;
    }

    this.events = events;

    prepare(undefined, events);
  }

  componentDidMount() {
    window.addEventListener(RESIZE, this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.resize);
  }

  resize = () => {
    if (!this.c) {
      return;
    }

    const width = this.c.offsetWidth;

    const windowWidth = window.innerWidth;

    let itemWidth;
    if (windowWidth > 899) {
      itemWidth = 365;
    } else {
      itemWidth = 300;
    }

    let count = (width / (itemWidth + 20)) | 0;
    if (count === 0) {
      count = 1;
    }

    this.setState({
      width: 20 + (itemWidth * count) + (20 * count),
    });
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
      />
    );
  }

  render() {
    const { title, t } = this.props;

    const { width } = this.state;

    const titleTranslation = t(title);

    return (
      <div ref={this.ref}>
        <div
          className={styles.container}
          style={{
            width,
          }}
        >

          {title && (
            <div className={styles.header}>
              <div className={styles.logoTitle}>

                <LogoCircle className={styles.logoCircle} />

                <h1 className={cx(H3_SMALL, styles.title)}>
                  {titleTranslation.split ?
                    titleTranslation.split('\n').map(renderLine) :
                    titleTranslation}
                </h1>

              </div>
            </div>
          )}

          {null
            // <Featured entity={EVENT} t={t} />
          }

          {this.events.length === 0 ? (
            <StatusMessage
              title={t([EVENTS, STATUS, TITLE])}
              message={t([EVENTS, STATUS, MESSAGE])}
              dark
            />
          ) : (
            <div className={styles.grid}>
              {map(this.events, this.renderItem)}
            </div>
          )}

        </div>
      </div>
    );
  }
}

export default withSub(EventsList, ({
  city,
  country,
  gameId,
  limit = 12,
  region,
}) => {
  const eventsProps = {};

  if (country) {
    eventsProps.country = country;

    if (city) {
      eventsProps.city = city;
    }
  } else if (region) {
    eventsProps.region = region;
  }

  if (gameId) {
    eventsProps.gameId = gameId;
  }

  return [{
    name: UPCOMING_EVENTS,
    props: eventsProps,
    loadMore: {
      increment: limit,
      initial: limit,
    },
  }];
}, function mapStateToProps(state) {
  return {
    events: getUpcomingEvents(state, { now: dayjs.utc().add(1, HOUR) }),
  };
});
