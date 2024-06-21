import React, { Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import isFunction from 'lodash/isFunction';
import Formsy from 'formsy-react';
import {
  CHECKBOX,
  DIV,
  LABEL,
  WARNING,
} from 'defaults';
import styles from './css/styles.css';

const FormCheckbox = createReactClass({
  propTypes: {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool,
  },

  mixins: [
    Formsy.Mixin,
  ],

  onChange(ev) {
    const { target: { checked: value } } = ev;

    const { onChange } = this.props;

    this.setValue(value);

    if (isFunction(onChange)) {
      onChange(value);
    }
  },

  render() {
    const {
      className,
      label,
      name,
      required,
    } = this.props;

    const value = this.getValue() || false;

    const errorMessage = this.getErrorMessage();

    const isPristine = this.isPristine();

    let Comp;
    let props;
    if (className) {
      Comp = DIV;
      props = {
        className,
      };
    } else {
      Comp = Fragment;
    }

    return (
      <div className={styles.checkboxWrapper}>
        <div>
          <Comp {...props}>

            <input
              type={CHECKBOX}
              className={cx(styles.checkbox, { [styles.invalid]: !isPristine && !!errorMessage })}
              id={name}
              name={name}
              value={value}
              checked={value}
              onChange={this.onChange}
              required={required}
            />

            <label
              className={LABEL}
              htmlFor={name}
              dangerouslySetInnerHTML={{ __html: label }}
            />

          </Comp>
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

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
