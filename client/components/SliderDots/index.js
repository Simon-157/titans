import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { emptyFunc } from 'defaults';
import styles from './css/styles.css';

class SliderDots extends Component {
  static displayName = 'SliderDots'

  static propTypes = {
    quantity: PropTypes.number,
    activeIndex: PropTypes.number,
    setActiveIndex: PropTypes.func,
  }

  static defaultProps = {
    activeIndex: 0,
    setActiveIndex: emptyFunc,
  }

  renderDot = (el, activeIndex) => {
    const { setActiveIndex } = this.props;
    const isActive = activeIndex === this.props.activeIndex;

    return (
      <div
        className={cx(styles.dot, { [styles.active]: isActive })}
        key={activeIndex}
        onClick={() => setActiveIndex(activeIndex)}
      />
    );
  }

  render() {
    const { quantity } = this.props;
    const dotsArray = Array(quantity).fill(null);

    return (
      <div className={cx(styles.container)}>
        {dotsArray.map(this.renderDot)}
      </div>
    );
  }
}

export default SliderDots;
