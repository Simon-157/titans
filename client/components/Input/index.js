import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import { BORDER, CHECKBOX } from 'defaults';
import styles from './css/styles.css';

class Input extends Component {
  static displayName = 'Input'

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
    minLength: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
    checked: PropTypes.bool,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    dark: PropTypes.bool,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    textarea: PropTypes.bool,
    onChange: PropTypes.func,
  }

  onChange = (ev) => {
    const { type, onChange } = this.props;

    let value;
    if (type === CHECKBOX) {
      value = ev.currentTarget.checked;
    } else {
      value = ev.currentTarget.value;
    }

    if (isFunction(onChange)) {
      onChange(value);
    }
  }

  render() {
    const {
      id,
      checked,
      className,
      minLength,
      name,
      type,
      placeholder,
      value,
      autoComplete,
      dark,
      required,
      readOnly,
      textarea,
    } = this.props;

    const Element = textarea ? 'textarea' : 'input';

    return (
      <Element
        id={id}
        className={cx(BORDER, styles.input, className, {
          [styles.dark]: dark,
        })}
        minLength={minLength}
        name={name}
        type={type}
        value={value}
        checked={checked}
        placeholder={placeholder}
        required={required}
        onChange={this.onChange}
        readOnly={readOnly}
        autoComplete={autoComplete}
        rows={textarea ? 5 : null}
      />
    );
  }
}

export default Input;
