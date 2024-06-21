import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import createReactClass from 'create-react-class';
import isFunction from 'lodash/isFunction';
import Formsy from 'formsy-react';
import { _ID, NAME, WARNING } from 'defaults';
import Select from 'components/Select';
import formStyles from '../css/styles.css';
import styles from './css/styles.css';

const FormSelect = createReactClass({
  propTypes: {
    className: PropTypes.string,
    formId: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    label: PropTypes.string,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    placeholder: PropTypes.string,
    dark: PropTypes.bool,
    input: PropTypes.bool,
    multiple: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    resultLabel: PropTypes.string,
    disabled: PropTypes.bool,
    autocomplete: PropTypes.func,
    onChange: PropTypes.func,
  },

  mixins: [
    Formsy.Mixin,
  ],

  onChange(ev) {
    const { onChange } = this.props;

    const { value } = ev.currentTarget;

    this.setValue(value);

    if (isFunction(onChange)) {
      onChange(value);
    }
  },

  render() {
    const {
      className,
      autocomplete,
      formId,
      name,
      label,
      placeholder,
      data,
      dark,
      disabled,
      input,
      multiple,
      readOnly,
      required,
      resultLabel,
      valueKey = _ID,
      labelKey = NAME,
    } = this.props;

    const id = `${FormSelect.displayName}-${name}${formId ? `-${formId}` : ''}`;

    const value = this.getValue();

    const errorMessage = this.getErrorMessage();

    const isPristine = this.isPristine();

    return (
      <div className={formStyles.controlWrapper}>

        <div className={cx(className, formStyles.control)}>
          <Select
            id={id}
            className={cx(styles.select, {
              [styles.multiple]: multiple,
              [styles.invalid]: !isPristine && !!errorMessage,
              multiple,
            })}
            valueKey={valueKey}
            labelKey={labelKey}
            data={data}
            label={label}
            name={name}
            placeholder={placeholder}
            value={value}
            dark={dark}
            disabled={disabled}
            input={input}
            multiple={multiple}
            readOnly={readOnly}
            required={required}
            resultLabel={resultLabel}
            autocomplete={autocomplete}
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

FormSelect.displayName = 'FormSelect';

export default FormSelect;
