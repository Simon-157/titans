import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import { CHECKBOX, CHECKMARK } from 'defaults';
import styles from './css/styles.css';

class Checkbox extends Component {
  static displayName = 'Checkbox'

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
  }

  onChange = (ev) => {
    const { target: { checked: value } } = ev;

    const { onChange } = this.props;

    if (isFunction(onChange)) {
      onChange(value);
    }
  }

  render() {
    const { className, name, value } = this.props;

    return (
      <label className={styles.container}>

        <input
          type={CHECKBOX}
          className={cx(className, styles.checkbox)}
          id={name}
          name={name}
          value={value}
          checked={value}
          onChange={this.onChange}
        />

        <span className={cx(styles.checkmark, CHECKMARK)}></span>

      </label>
    );
  }
}

export default Checkbox;
