import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './css/styles.css';

function LogoCircle({ className }) {
  return (
    <div className={cx(styles.logoCircle, className)} />
  );
}

LogoCircle.propTypes = {
  className: PropTypes.string,
};

export default LogoCircle;
