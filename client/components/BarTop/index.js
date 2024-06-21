import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  BARS,
  CENTER,
  CONTAINER,
  DISCOVER,
  FAQ,
  FLEX,
  GATHER,
  LEFT_BAR,
} from 'defaults';
import LogoCircle from 'components/LogoCircle';
import styles from './css/styles.css';

function BarTop({ withLogo, t }) {
  return (
    <div className={styles.barTop}>

      <div className={cx(CONTAINER, FLEX, CENTER)}>

        <div className={styles.topLeft}>
          {t([BARS, DISCOVER])}
        </div>

        <div className={styles.topRight}>

          <span className={styles.topText}>{t([BARS, GATHER])}</span>

          <Link to={'/faq'}>
            <button className={styles.faqButton}>
              {t([LEFT_BAR, FAQ])}
            </button>
          </Link>

        </div>

      </div>

      {withLogo && (
        <LogoCircle className={styles.logoCircle} />
      )}

    </div>
  );
}

BarTop.displayName = 'BarTop';

BarTop.propTypes = {
  withLogo: PropTypes.bool,
  t: PropTypes.func,
};

export default BarTop;
