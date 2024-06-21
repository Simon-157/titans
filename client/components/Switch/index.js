import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { emptyFunc, SWITCH } from 'defaults';
import styles from './css/styles.css';

export class Switch extends Component {
  static displayName = 'Switch'

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: emptyFunc,
  }

  toggle = () => {
    const { value, onChange } = this.props;

    onChange(!value);
  }

  render() {
    const { className, value } = this.props;

    return (
      <div
        className={cx(className, SWITCH, styles.switch, {
          [styles.active]: value,
          active: value,
        })}
        onClick={this.toggle}
      >
        <div className={styles.blob} />
      </div>
    );
  }
}

export default Switch;
