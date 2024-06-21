import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { POINTER } from 'defaults';
import styles from './css/styles.css';

class Mini extends Component {
  static displayName = 'Mini'

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.object,
    index: PropTypes.number,
    setIndex: PropTypes.func,
  }

  onClick = () => {
    const { index, setIndex } = this.props;

    setIndex(index);
  }

  render() {
    const { active, children } = this.props;

    return (
      <div
        className={cx(styles.miniItem, POINTER, {
          [styles.active]: active,
        })}
        onClick={this.onClick}
      >
        {children}
      </div>
    );
  }
}

export default Mini;
