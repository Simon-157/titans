import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import round from 'lodash/round';
import { RANGE } from 'defaults';
import styles from './css/styles.css';

class Slider extends Component {
  static displayName = 'Slider'

  static propTypes = {
    className: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    multiplier: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    min: 0,
    max: 1,
    step: 0.01,
    multiplier: 1,
    value: 1,
  }

  onChange = (ev) => {
    const { multiplier, onChange } = this.props;

    if (!isFunction(onChange)) {
      return;
    }

    const val = Math.round(ev.target.value * multiplier) / multiplier;

    onChange(ev, val);
  }

  render() {
    const {
      className,
      min = 0,
      max = 1,
      step = 0.01,
      multiplier = 100,
      value = 0.3,
      disabled,
    } = this.props;

    let styledLeft = round(((value - min) / (max - min)) * 100, 2);

    const maxPossibleValue = max * multiplier;

    if (styledLeft > maxPossibleValue) {
      styledLeft = maxPossibleValue;
    }

    const style = {
      transform: `translateX(${styledLeft}%)`,
    };

    return (
      <div className={cx(styles.container, className)}>

        <div className={styles.slider}>

          <input
            className={styles.input}
            type={RANGE}
            min={min}
            value={value}
            max={max}
            step={step}
            disabled={disabled}
            onChange={this.onChange}
          />

          <div className={styles.styled}>

            <div className={styles.trackWrap}>
              <div
                className={styles.track}
                style={style}
              />
            </div>

            <div className={styles.thumbWrap}>
              <div
                className={styles.thumb}
                style={{
                  left: `${styledLeft}%`,
                }}
              />
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default Slider;
