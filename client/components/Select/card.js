import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './css/styles.css';

class SelectCard extends Component {
  static displayName = 'SelectCard'

  static propTypes = {
    labelKey: PropTypes.string,
    option: PropTypes.object,
    valueKey: PropTypes.string,
    onOptionClick: PropTypes.func,
  }

  onClick = () => {
    const { option, onOptionClick } = this.props;

    onOptionClick(option);
  }

  render() {
    const { labelKey, option, valueKey } = this.props;

    return (
      <div
        key={option[valueKey]}
        className={styles.card}
      >

        <span>
          {option[labelKey]}
        </span>

        <div
          className={styles.cross}
          onClick={this.onClick}
        />

      </div>
    );
  }
}

export default SelectCard;
