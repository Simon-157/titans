import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { EVENTS, UPCOMING, UPCOMING_EVENTS } from 'defaults';
import FeaturedBlock from 'components/FeaturedBlock';
import styles from './css/styles.css';

function BarEvents(props) {
  const { bar, id, t } = props;

  if (!bar) {
    return null;
  }

  return (
    <div className={cx(styles.events, styles.upcoming)}>
      <FeaturedBlock
        count={3}
        entity={EVENTS}
        sub={UPCOMING_EVENTS}
        props={{
          barId: id,
        }}
        title={t([EVENTS, UPCOMING])}
        t={t}
      />
    </div>
  );
}

BarEvents.displayName = 'BarEvents';

BarEvents.propTypes = {
  bar: PropTypes.object,
  id: PropTypes.string,
  t: PropTypes.func,
};

export default BarEvents;
