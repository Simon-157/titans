import React from 'react';
import cx from 'classnames';
import DatePicker from 'react-datepicker';
import createReactClass from 'create-react-class';
import { Mixin } from 'formsy-react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import 'react-datepicker/dist/react-datepicker.css';
import { WARNING } from 'defaults';
import { getLocale, defaultLocale } from 'lib/i18n';
import styles from './css/styles.css';

export const datePickersFormat = {
  'en-US': 'MM/dd/yyyy',
  [defaultLocale]: 'dd/MM/yyyy',
};

const Datepicker = createReactClass({
  displayName: 'Datepicker',

  propTypes: {
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholderText: PropTypes.string,
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
    const value = this.getValue();
    const { name, label, placeholderText } = this.props;
    const errorMessage = this.getErrorMessage();
    const isPristine = this.isPristine();
    const locale = getLocale();
    const dateFormat = datePickersFormat[locale] || datePickersFormat[defaultLocale];

    return (
      <div className={styles.datepickerWrapper}>

        <div className={styles.datepicker}>
          {label && (
            <label
              htmlFor={name}
              className={styles.datepickerLabel}
            >
              {label}
            </label>
          )}
          <DatePicker
            className={cx({ [styles.invalid]: !isPristine && !!errorMessage })}
            id={name}
            ref={'datepicker'}
            {...this.props}
            placeholderText={placeholderText ? `${placeholderText} (${dateFormat})` : ''}
            autoComplete={'off'}
            dateFormat={dateFormat}
            selected={value}
            onChange={this.onChange}
            showYearDropdown
            showMonthDropdown
            yearDropdownItemNumber={100}
            scrollableYearDropdown
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

export default Datepicker;
