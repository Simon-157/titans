import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { GRADIENT, LENGTH, NEWS, MORE } from 'defaults';
import Forward from 'assets/img/forward.svg';
import styles from './css/styles.css';

function NewsInfo({ item, t }) {
  const { categories, date, title } = item;

  const catsLength = get(categories, [LENGTH]);

  const cats = catsLength && categories.split(',').join(', ');

  const mom = dayjs(date);

  return (
    <div className={cx(GRADIENT, styles.news)}>

      <div className={styles.itemTop}>

        <span className={styles.cat}>
          {cats}
        </span>

        <span className={styles.date}>
          {mom.isAfter(new Date()) ? '' : mom.fromNow()}
        </span>

      </div>

      <h3 className={styles.itemTitle}>
        {title}
      </h3>

      <div className={styles.more}>

        {t([NEWS, MORE])}

        <Forward className={styles.forward} />

      </div>

    </div>
  );
}

NewsInfo.displayName = 'NewsInfo';

NewsInfo.propTypes = {
  item: PropTypes.object,
  t: PropTypes.func,
};

export default NewsInfo;
