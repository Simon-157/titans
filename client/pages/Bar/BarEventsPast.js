import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import {
  emptyArr,
  BLOCK_HEADER,
  CONTAINER,
  DESC,
  EVENTS,
  HOUR,
  RED,
  START_AT,
  TITLE,
  WHITE,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import FeaturedItem from 'components/FeaturedBlock/FeaturedItem';
import { getPastBarEvents } from 'reducers/event/selectors';
import styles from './css/styles.css';

class BarEventsPast extends Component {
  static displayName = 'BarEventsPast'

  static propTypes = {
    events: PropTypes.array,
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  events = emptyArr

  constructor(props) {
    super(props);

    const { events } = props;

    this.prevProps = events;

    this.prepare(events);
  }

  shouldComponentUpdate(newProps) {
    const { events, userId } = newProps;

    const equals = isEqual(this.prevProps, events);

    if (!equals) {
      this.prevProps = events;

      this.prepare(events);
    }

    return !(
      equals &&
      this.props.userId === userId
    );
  }

  prepare(events) {
    if (!events) {
      return;
    }

    this.events = orderBy(events, START_AT, DESC);
  }

  render() {
    const { events } = this;

    if (events.length === 0) {
      return null;
    }

    const { userId, t } = this.props;

    return (
      <div className={CONTAINER}>

        <div className={cx(BLOCK_HEADER, RED, WHITE)}>
          <div className={TITLE}>
            {t(['pastEvents'])}
          </div>
        </div>

        <div className={styles.grid}>
          {map(events, (item) => {
            const { _id } = item;

            return (
              <FeaturedItem
                key={_id}
                className={styles.event}
                entity={EVENTS}
                item={item}
                userId={userId}
                t={t}
                fade
              />
            );
          })}
        </div>

      </div>
    );
  }
}

export default withSub(BarEventsPast, function barEventsPastSub({ id }) {
  return [{
    name: 'pastEvents',
    props: {
      barId: id,
    },
    loadMore: {
      increment: 3,
      initial: 3,
    },
  }];
}, function mapStateToProps(state, { id }) {
  return {
    events: getPastBarEvents(state, { barId: id, now: dayjs.utc().add(1, HOUR) }),
  };
});
