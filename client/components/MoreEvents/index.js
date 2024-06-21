import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import map from 'lodash/map';
import set from 'lodash/set';
import {
  emptyArr,
  emptyNullFunc,
  CONTAINER,
  DIV,
  END_AT,
  EVENT,
  EVENTS,
  GET,
  MORE,
  START_AT,
  TRANSPARENT,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import FeaturedItem from 'components/FeaturedBlock/FeaturedItem';
import { getCurrentUser } from 'reducers/user/selectors';
import styles from './css/styles.css';

class MoreEvents extends Component {
  static displayName = 'MoreEvents'

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.object,
    latLng: PropTypes.string,
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    events: emptyArr,
    limit: 4,
  }

  constructor(props) {
    super(props);

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    const { latLng } = newProps;

    if (latLng && latLng !== this.props.latLng) {
      this.prepare(newProps);
    }
  }

  prepare(props = this.props, state = this.state) {
    const { eventId, latLng } = props;

    const { limit } = state;

    if (latLng) {
      executePrimusRequest(GET, EVENT, {
        approved: true,
        eventId,
        latLng,
        limit,
      }, this.cb);
    }
  }

  cb = (err, data) => {
    if (err) {
      return;
    }

    const { event } = data;

    let eventsLength = event.length;
    while (eventsLength-- > 0) {
      const item = event[eventsLength];

      const { endAt, startAt } = item;

      set(item, [END_AT], dayjs(endAt));
      set(item, [START_AT], dayjs(startAt));
    }

    this.setState({
      events: event,
    });
  }

  more = () => {
    const { limit } = this.state;

    const newState = {
      limit: limit + 4,
    };

    this.setState(newState);

    this.prepare(this.props, newState);
  }

  renderEvent = (event) => {
    const { userId, t } = this.props;

    const { id } = event;

    return (
      <FeaturedItem
        key={id}
        entity={EVENTS}
        item={event}
        userId={userId}
        t={t}
      />
    );
  }

  render() {
    const { events, limit } = this.state;

    if (!events.length) {
      return null;
    }

    const { className, children, t } = this.props;

    let Comp;
    let props;
    if (className) {
      Comp = DIV;
      props = {
        className,
      };
    } else {
      Comp = Fragment;
    }

    return (
      <Comp {...props}>

        <div className={CONTAINER}>

          {children}

          <div className={styles.events}>
            {map(events, this.renderEvent)}
          </div>

          {limit <= events.length && (
            <button
              className={cx(TRANSPARENT, styles.more)}
              onClick={this.more}
            >
              {t([EVENTS, MORE])}
            </button>
          )}

        </div>

      </Comp>
    );
  }
}

function mapStateToProps(state) {
  const user = getCurrentUser(state);
  const userId = user?.id;

  return {
    userId,
  };
}

export default connect(mapStateToProps)(MoreEvents);
