import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import {
  ACTIVE,
  ICON,
  ITEM,
  POINTER,
} from 'defaults';
import styles from './css/styles.css';

class SelectOption extends Component {
  static displayName = 'SelectOption'

  static propTypes = {
    active: PropTypes.bool,
    option: PropTypes.object,
    labelKey: PropTypes.string,
    valueIcon: PropTypes.string,
    disabled: PropTypes.bool,
    onOptionClick: PropTypes.func,
  }

  onClick = () => {
    const { option, onOptionClick } = this.props;

    onOptionClick(option);
  }

  render() {
    const { active, disabled, option, labelKey, valueIcon } = this.props;

    return (
      <div
        className={cx(POINTER, ITEM, styles.item, {
          [ACTIVE]: active,
        })}
        onClick={disabled ? null : this.onClick}
      >

        {get(option, valueIcon) && (
          <img className={styles.icon} src={get(option, valueIcon)} alt={ICON} />
        )}

        <span>
          {get(option, labelKey)}
        </span>

      </div>
    );
  }
}

export default SelectOption;
