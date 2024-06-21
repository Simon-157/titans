import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ACTIVE, DOT, POINTER } from 'defaults';
import styles from './css/styles.css';

class Dot extends Component {
  static displayName = 'Dot'

  static propTypes = {
    active: PropTypes.bool,
    index: PropTypes.number,
    setIndex: PropTypes.func,
  }

  onClick = () => {
    const { index, setIndex } = this.props;

    setIndex(index);
  }

  render() {
    const { active } = this.props;

    return (
      <div
        className={cx(styles.dot, DOT, POINTER, {
          [ACTIVE]: active,
          [styles.active]: active,
        })}
        onClick={this.onClick}
      />
    );
  }
}

export default Dot;
