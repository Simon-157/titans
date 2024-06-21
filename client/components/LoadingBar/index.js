import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { LOADER } from 'defaults';
import styles from './css/styles.css';

function LoadingBar({ className }) {
  return (
    <div className={cx(LOADER, styles.loader, className)} />
  );
}

LoadingBar.propTypes = {
  className: PropTypes.string,
};

export default LoadingBar;
