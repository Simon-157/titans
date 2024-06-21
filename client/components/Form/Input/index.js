import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import { addValidationRule, Mixin } from 'formsy-react';
import { LABEL, NUMBER, REQUIRED, WARNING } from 'defaults';
import Input from 'components/Input';
import styles from '../css/styles.css';

addValidationRule(REQUIRED, (values, value) => !!value);

const FormInput = createReactClass({
  propTypes: {
    formId: PropTypes.string,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.number,
    minLength: PropTypes.number,
    max: PropTypes.number,
    dark: PropTypes.bool,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    textarea: PropTypes.bool,
    onChange: PropTypes.func,
  },

  mixins: [
    Mixin,
  ],

  onChange(value) {
    const { type, min, max, onChange } = this.props;

    if (type === NUMBER) {
      value = parseInt(value); // eslint-disable-line

      if (min && value < min) {
        value = min; // eslint-disable-line
      } else if (max && value > max) {
        value = max; // eslint-disable-line
      }
    }

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
      type,
      placeholder,
      label,
      dark,
      minLength,
      required,
      readOnly,
      autoComplete,
      textarea,
    } = this.props;

    const id = `${FormInput.displayName}-${name}${formId ? `-${formId}` : ''}`;

    const value = this.getValue();

    const errorMessage = this.getErrorMessage();

    const isPristine = this.isPristine();

    return (
      <div className={styles.controlWrapper}>

        <div className={cx(className, styles.control)}>

          {label && (
            <label
              htmlFor={id}
              className={cx(LABEL, styles.label)}
            >
              {label}
            </label>
          )}

          <Input
            className={cx({ [styles.invalid]: !isPristine && !!errorMessage })}
            id={id}
            name={name}
            type={type}
            value={isNil(value) ? '' : value}
            placeholder={placeholder}
            dark={dark}
            minLength={minLength}
            required={required}
            readOnly={readOnly}
            textarea={textarea}
            autoComplete={autoComplete}
            onChange={this.onChange}
          />

        </div>

        {!isPristine && !!errorMessage && (
          <div className={WARNING}>
            {errorMessage}
          </div>
        )}

      </div>
    );
  },
});

FormInput.displayName = 'FormInput';

export default FormInput;
