import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import { Mixin } from 'formsy-react';
import { ERROR } from 'defaults';
import Switch from 'components/Switch';
import { getError } from '../validation';
import formStyles from '../css/styles.css';
import styles from './css/styles.css';

const FormSwitch = createReactClass({
  propTypes: {
    formId: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
  },

  mixins: [
    Mixin,
  ],

  onChange(value) {
    const { onChange } = this.props;

    this.setValue(value);

    if (isFunction(onChange)) {
      onChange(value);
    }
  },

  render() {
    const {
      formId,
      className,
      name,
      label,
      required,
    } = this.props;

    const id = `${FormSwitch.displayName}-${name}${formId ? `-${formId}` : ''}`;

    const value = this.getValue();

    const err = getError(value, this.props, this.state);

    return (
      <div className={cx(className, formStyles.control)}>

        {label && (
          <label
            htmlFor={id}
            className={formStyles.label}
          >
            {`${label}${required ? ' *' : ''} `}
          </label>
        )}

        {err && (
          <span className={ERROR}>
            {err}
          </span>
        )}

        <Switch
          id={id}
          className={cx(styles.switch, 'switch')}
          value={isNil(value) ? '' : value}
          required={required}
          onChange={this.onChange}
        />

      </div>
    );
  },
});

FormSwitch.displayName = 'FormSwitch';

export default FormSwitch;
