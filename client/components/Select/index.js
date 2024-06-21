import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import pick from 'lodash/pick';
import size from 'lodash/size';
import {
  emptyArr,
  emptyFunc,
  _ID,
  ACTIVE,
  CLICK,
  CONTENT,
  DATA,
  DISABLED,
  ICON,
  LABEL,
  LIST,
  NAME,
  NEW_PASSWORD,
  OPTION,
  PLACEHOLDER,
  POINTER,
  READ_ONLY,
  RESULT,
  SELECT,
  VALUE,
  WITH_LABEL,
  CLASS_NAME,
} from 'defaults';
import { findInObject } from 'lib/object';
import { randomId } from 'lib/random';
import { isInside } from 'client/helpers';
import SelectCard from './card';
import SelectOption from './option';
import styles from './css/styles.css';

const { isArray } = Array;

const updateProps = [DATA, DISABLED, PLACEHOLDER, READ_ONLY, VALUE, CLASS_NAME];

class Select extends Component {
  static displayName = 'Select'

  static propTypes ={
    className: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    htmlAutocomplete: PropTypes.string,
    label: PropTypes.string,
    labelKey: PropTypes.string,
    resultLabel: PropTypes.string,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]), // eslint-disable-line
    valueKey: PropTypes.string,
    valueIcon: PropTypes.string,
    disabled: PropTypes.bool,
    input: PropTypes.bool,
    multiple: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    autocomplete: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    data: emptyArr,
    valueKey: _ID,
    labelKey: NAME,
    onChange: emptyFunc,
  }

  state = {
    active: false,
  }

  constructor(props) {
    super(props);

    this.className = randomId();

    this.prevProps = pick(props, updateProps);

    this.prepare();

    const { autocomplete, onChange } = props;

    if (isFunction(autocomplete)) {
      this.autocomplete = debounce(autocomplete, 350);
    }

    this.onChange = debounce(onChange, 350);
  }

  shouldComponentUpdate(newProps, newState) {
    const newPrevProps = pick(newProps, updateProps);

    const propsEqual = isEqual(this.prevProps, newPrevProps);

    if (!propsEqual) {
      this.prevProps = newPrevProps;

      this.prepare(newProps);
    }

    const equals = propsEqual && this.state.active === newState.active;

    return !equals;
  }

  prepare(props = this.props) {
    const { data, value, valueKey, multiple } = props;

    if (value === null) {
      this.value = null;
      if (!this.searchStr && this.input) {
        this.input.value = '';
      }
    } else if (isArray(value) ? size(value) : data[value]) {
      this.value = null;
    }

    if (data) {
      if (this.searchStr) {
        const { labelKey } = this.props;

        this.data = this.sortBySearchString(filter(data, (item) => {
          return findInObject(item, this.searchStr, [labelKey]);
        }), this.searchStr, labelKey);
      } else {
        this.data = data;
      }
    }

    this.selected = size(data) === 1 ?
      find(data, (item) => item[valueKey] === value) :
      (
        multiple ?
          filter(data, (item) => (
            isArray(value) ?
              value.indexOf(get(item, [valueKey])) !== -1 :
              get(item, [valueKey]) === value)) :
          find(data, (item) => get(item, [valueKey]) === value)
      );
  }

  componentWillUnmount() {
    document.removeEventListener(CLICK, this.clickout);
  }

  toggleActive = (flag) => {
    let active;
    if (isBoolean(flag)) {
      active = flag;
    } else {
      active = !this.state.active;
    }

    this.setState({
      active,
    });

    if (active) {
      document.addEventListener(CLICK, this.clickout);
    } else {
      document.removeEventListener(CLICK, this.clickout);
    }
  }

  clickout = (ev) => {
    if (isInside(ev.target, [this.className])) {
      return;
    }

    this.toggleActive(false);
  }

  change = (ev, fromInput) => {
    const { multiple } = this.props;

    if (fromInput) {
      const value = this.searchStr = ev.currentTarget.value;

      this.toggleActive(true);

      if (this.autocomplete) {
        this.autocomplete(value);
      } else {
        this.filter(value);
      }
    } else {
      this.searchStr = null;
      if (this.input) {
        this.input.value = '';
      }
      this.value = null;
      this.toggleActive(false);
    }

    if ((multiple ? !fromInput : true)) {
      const { currentTarget } = ev;

      this.onChange({ currentTarget }, fromInput);
    }
  }

  onOptionClick = (option) => {
    const { multiple, valueKey, value } = this.props;

    const val = get(option, [valueKey]);

    let newValue;
    if (!value) {
      newValue = val;
    } else if (value === val) {
      newValue = null;
    } else if (multiple) {
      if (isArray(value)) {
        const index = value.indexOf(val);

        if (index !== -1) {
          newValue = [...value];
          newValue.splice(index, 1);
        } else {
          newValue = [...value, val];
        }
      } else {
        newValue = [value, val];
      }
    } else {
      newValue = val;
    }

    this.change({
      currentTarget: {
        value: newValue,
      },
    });
  }

  onInputChange = (ev) => {
    this.change(ev, true);
  }

  filter = (searchStr = '') => {
    const { data, labelKey } = this.props;

    if (searchStr === '') {
      this.value = '';
      this.data = data;
    } else {
      this.value = searchStr;
      this.data = this.sortBySearchString(filter(data, (item) => {
        return findInObject(item, searchStr, [labelKey]);
      }), searchStr, labelKey);
    }

    this.forceUpdate();
  }

  sortBySearchString = (array, string, key) => {
    const searchString = string.toLowerCase();

    return array.sort((a, b) => {
      const indexA = a[key].toLowerCase().indexOf(searchString);
      const indexB = b[key].toLowerCase().indexOf(searchString);

      return indexA - indexB;
    });
  };

  ref = (input) => {
    this.input = input;
  }

  resultRef = (result) => {
    this.result = result;
  }

  renderOption = (option, key) => {
    const {
      valueKey,
      valueIcon,
      labelKey,
      value,
      multiple,
      disabled,
    } = this.props;

    const active = this.selected && (
      (isArray(this.selected) ?
        find(this.selected, (item) => {
          return item[valueKey] === option[valueKey];
        }) :
        this.selected[valueKey] === option[valueKey]
      )
    );

    return (
      <SelectOption
        key={key}
        active={Boolean(active)}
        option={option}
        labelKey={labelKey}
        valueKey={valueKey}
        valueIcon={valueIcon}
        value={value}
        multiple={multiple}
        disabled={disabled}
        onOptionClick={this.onOptionClick}
      />
    );
  }

  onLabelClick = () => {
    this.result.click();
  }

  render() {
    const {
      className,
      data,
      valueKey,
      valueIcon,
      label,
      labelKey,
      placeholder,
      value,
      input,
      multiple,
      disabled,
      readOnly,
      required,
      resultLabel,
      htmlAutocomplete,
    } = this.props;

    const { active } = this.state;

    return (
      <>

        {resultLabel && (
          <label onClick={this.onLabelClick}>
            {resultLabel}
          </label>
        )}

        <div
          className={cx(
            SELECT,
            className,
            this.className,
            styles.container,
            {
              [ACTIVE]: active,
              [styles.open]: active,
            },
          )}
        >

          <div
            className={cx(CONTENT, styles.content, {
              [styles.disabled]: disabled,
            })}
          >

            <div
              ref={this.resultRef}
              className={cx(styles.result, RESULT, {
                [ACTIVE]: value,
                [POINTER]: !disabled,
                [styles.active]: value,
                [styles.padding]: !input,
              })}
              onClick={disabled || readOnly ? null : this.toggleActive}
            >

              {get(this.selected, valueIcon) &&
                (<img className={styles.icon} src={get(this.selected, valueIcon)} alt={ICON} />)
              }

              {multiple ? (
                input ? (
                  <>

                    <input
                      className={cx({
                        [WITH_LABEL]: label,
                      })}
                      autoComplete={htmlAutocomplete || NEW_PASSWORD}
                      ref={this.ref}
                      placeholder={placeholder}
                      value={isNil(this.value) ? undefined : this.value}
                      onChange={this.onInputChange}
                    />

                    {label && (
                      <div
                        className={`${LABEL} ${styles.label}`}
                        key={LABEL}
                      >
                        {label}
                      </div>
                    )}

                  </>
                ) :
                  (size(this.selected) !== 0 ?
                    map(this.selected, labelKey).join(', ') :
                    placeholder
                  )
              ) : (
                input ? (
                  <>

                    <input
                      className={cx(styles.input, {
                        [WITH_LABEL]: label,
                      })}
                      autoComplete={htmlAutocomplete || NEW_PASSWORD}
                      ref={this.ref}
                      placeholder={placeholder}
                      value={!isNil(this.value) ? undefined : get(this.selected, [labelKey])}
                      onChange={this.onInputChange}
                    />

                    {label && (
                      <div
                        className={`${LABEL} ${styles.label}`}
                        key={LABEL}
                      >
                        {label}
                      </div>
                    )}

                  </>
                ) : get(this.selected, [labelKey], placeholder)
              )}
            </div>

            {multiple && input && size(this.selected) !== 0 && (
              <div className={styles.cards}>
                {map(this.selected, (item) => {
                  return (
                    <SelectCard
                      key={item[valueKey]}
                      labelKey={labelKey}
                      option={item}
                      valueKey={valueKey}
                      onOptionClick={this.onOptionClick}
                    />
                  );
                })}
              </div>
            )}

            <div
              className={cx(LIST, styles.list, {
                [styles.active]: active,
              })}
            >
              {map(this.data, this.renderOption)}
            </div>

          </div>

          <select
            className={styles.select}
            value={value || ''}
            multiple={multiple}
            onChange={this.onChange}
            required={required}
          >

            <option value={''}>
              None
            </option>

            {map(data, (item, key) => (
              <option
                key={key}
                value={get(item, [valueKey])}
              >
                {get(item, [OPTION]) || get(item, [labelKey])}
              </option>
            ))}

          </select>

        </div>
      </>
    );
  }
}

export default Select;
