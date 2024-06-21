import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { H3_SMALL, ICON, STATUS } from 'defaults';
import styles from './css/styles.css';

function StatusMessage({ className, dark, message, icon, title }) {
  return (
    <div
      className={cx(STATUS, className, styles.status, {
        [styles.dark]: dark,
      })}
    >

      {icon && (
        <div className={cx(ICON, styles.icon)} />
      )}

      {title && (
        <div className={H3_SMALL}>
          {title}
        </div>
      )}

      {message && (
        <div className={styles.content}>
          {message}
        </div>
      )}

    </div>
  );
}

StatusMessage.propTypes = {
  className: PropTypes.string,
  dark: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default StatusMessage;
