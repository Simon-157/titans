import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import startCase from 'lodash/startCase';
import { ICON, LINE } from 'defaults';
import Clock from 'assets/img/clockSimple.svg';
import Home from 'assets/img/home.svg';
import Marker from 'assets/img/marker.svg';
import styles from './css/styles.css';

function EventInfo({ item }) {
  const { bar, city, country, endAt, startAt, title } = item;

  const start = dayjs(startAt);
  const end = dayjs(endAt);

  return (
    <div className={styles.event}>

      <h3 className={styles.itemTitle}>
        {title}
      </h3>

      <div className={styles.more}>

        <div className={cx(styles.line, LINE)}>

          <Clock className={cx(styles.icon, ICON)} />

          {`${start.format('MMM Do, YYYY | HH:mm')}-${end.format('HH:mm')}`}

        </div>

        {(city || country) && (
          <div className={cx(styles.line, LINE)}>

            <Marker className={cx(styles.icon, ICON)} />

            {city ? `${city}, ` : ''}

            {startCase(country)}

          </div>
        )}

        {bar && (
          <div className={cx(styles.line, LINE)}>

            <Home className={cx(styles.icon, ICON)} />

            {bar}

          </div>
        )}

      </div>

    </div>
  );
}

EventInfo.displayName = 'EventInfo';

EventInfo.propTypes = {
  item: PropTypes.object,
};

export default EventInfo;
