import React from 'react';
import cx from 'classnames';
import {
  BUTTON,
  CENTER,
  ERROR,
  PAGE,
  TERTIARY,
} from 'defaults';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import i18n from 'lib/i18n';
import styles from './css/styles.css';

function NotFoundPage(props) {
  const { t } = props;

  return (
    <div className={cx(PAGE, CENTER, styles.notFoundPage)}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>

          <div className={styles.error}>
            <img src={'/img/notFound/404.png'} alt={ERROR} />
          </div>

          <div className={styles.text}>
            {t(['oopsPageNotFound'])}
          </div>

          <div className={styles.description}>
            {t(['pageDoesntExist'])}
          </div>

          <div className={styles.button}>
            <Link
              className={cx(BUTTON, TERTIARY)}
              to={'/'}
            >
              {t(['returnHome'])}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

NotFoundPage.propTypes = {
  t: PropTypes.func,
};

NotFoundPage.displayName = 'NotFoundPage';

export default i18n(NotFoundPage);
