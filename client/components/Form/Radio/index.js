import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import Formsy from 'formsy-react';
import styles from './css/styles.css';

const FormRadio = createReactClass({
  propTypes: {
    className: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // eslint-disable-line
    required: PropTypes.bool,
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
    const { className, name, data, required } = this.props;

    const value = this.getValue();

    return (
      <div className={className}>
        {map(data, (item, key) => {
          const id = `${name}-${key}`;

          return (
            <div
              key={key}
              className={styles.item}
            >

              <input
                type={'radio'}
                className={styles.radio}
                id={id}
                name={name}
                value={item.value}
                checked={value === item.value}
                required={required}
                onChange={this.onChange}
              />

              <label htmlFor={id}>
                {item.label}
              </label>

            </div>
          );
        })}
      </div>
    );
  },
});

FormRadio.displayName = 'FormRadio';

export default FormRadio;
