import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import chunk from 'lodash/chunk';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import {
  emptyArr,
  emptyObj,
  BARS,
  BLOG,
  CREATED_AT,
  DATE,
  DESC,
  DISTANCE,
  EVENTS,
  FILES,
  HOUR,
  NAME,
  NEWS,
  START_AT,
  UPCOMING_EVENTS,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { getUpcomingBarEvents } from 'reducers/event/selectors';
import FeaturedItem from './FeaturedItem';
import styles from './css/styles.css';

const offsets = {};
function getTransformOffset(offset) {
  if (offsets[offset]) {
    return offsets[offset];
  }

  const result = offsets[offset] = offset ?
    `translateX(-${offset * 100}%)` :
    'translateX(0)';

  return result;
}

class FeaturedSub extends Component {
  static displayName = 'FeaturedSub'

  static propTypes = {
    count: PropTypes.number, // eslint-disable-line
    entity: PropTypes.string,
    offset: PropTypes.number,
    userId: PropTypes.string,
    setLength: PropTypes.func, // eslint-disable-line
    t: PropTypes.func,
  }

  items = emptyArr

  constructor(props) {
    super(props);

    const { entity } = props;

    this.prevProps = props[entity];

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    const { count, entity } = newProps;

    const newPropsToCheck = newProps[entity];

    const equals = isEqual(this.prevProps, newPropsToCheck) &&
      count === this.props.count;

    if (!equals) {
      this.prevProps = newPropsToCheck;

      this.prepare(newProps);
    }
  }

  prepare(props = this.props) {
    const { count, entity, setLength } = props;

    const items = props[entity];

    // better not change this check
    // modifying it might cause screen glitches
    // when sub data is in process of reloading
    if (!items) {
      return;
    }

    switch (entity) {
      case EVENTS:
        this.items = orderBy(items, [START_AT]);
        break;
      case BARS:
        this.items = orderBy(items, [DISTANCE, NAME]);
        break;
      case FILES:
        this.items = orderBy(items, CREATED_AT, DESC);
        break;
      case NEWS:
      case BLOG:
        this.items = items;
        break;
      default:
        this.items = orderBy(items, DATE, DESC);
    }

    setLength(this.items.length);

    this.items = chunk(this.items, count);
  }

  renderRow = (items, key) => {
    const { entity, userId, t } = this.props;

    return (
      <div key={key} className={styles.itemsRow}>
        {map(items, (item) => {
          const { _id } = item;

          return (
            <FeaturedItem
              key={_id}
              entity={entity}
              id={_id}
              item={item}
              userId={userId}
              t={t}
            />
          );
        })}
      </div>
    );
  }

  render() {
    const { offset } = this.props;

    const { length } = this.items;

    if (length === 0) {
      return null;
    }

    return (
      <div
        className={styles.items}
        style={{
          transform: getTransformOffset(offset),
        }}
      >
        {map(this.items, this.renderRow)}
      </div>
    );
  }
}

export default withSub(FeaturedSub, function featuredSub({
  limit,
  props,
  sub,
}) {
  if (!sub) {
    return emptyArr;
  }

  return [{
    name: sub,
    props: {
      ...props,
      limit,
    },
  }];
}, function mapStateToProps(state, { props: { barId } = emptyObj, sub }) {
  const data = {};

  switch (sub) {
    case UPCOMING_EVENTS:
      data.events = getUpcomingBarEvents(state, { barId, now: dayjs.utc().add(1, HOUR) });
      break;
    default:
  }

  return data;
});
