import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import isFunction from 'lodash/isFunction';
import {
  CENTER,
  CURRENT,
  FLEX,
  NAV,
  TRANSPARENT,
} from 'defaults';
import styles from './css/styles.css';

class Nav extends PureComponent {
  static propTypes = {
    counter: PropTypes.number,
    index: PropTypes.number,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    link: PropTypes.string,
    active: PropTypes.bool,
    history: PropTypes.object,
    onClick: PropTypes.func,
  }

  onClick = () => {
    const { index, history, link, onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(index);
    }

    if (link) {
      history.push(link);
    }
  }

  render() {
    const { label, active, counter } = this.props;

    return (
      <button
        className={cx(NAV, styles.navItem, {
          [styles.active]: active,
          [CURRENT]: active,
          [TRANSPARENT]: !active,
        })}
        onClick={this.onClick}
      >
        <span className={styles.navItemContent}>

          {label}

          {counter > 0 && (
            <div className={cx(FLEX, CENTER, styles.counter)}>
              {counter}
            </div>
          )}

        </span>
      </button>
    );
  }
}

export default withRouter(Nav);
