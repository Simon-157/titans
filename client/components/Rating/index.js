import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import round from 'lodash/round';
import { POINTER, STAR } from 'defaults';
import Star from 'assets/img/star.svg';
import styles from './css/styles.css';

class Rating extends Component {
  static propTypes = {
    className: PropTypes.string,
    number: PropTypes.bool,
    rating: PropTypes.number,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    rating: 0,
    readOnly: true,
  }

  state = {
    hover: null,
    rating: this.props.rating,
  }

  componentWillReceiveProps(newProps) {
    const { rating } = newProps;

    if (rating !== this.props.rating) {
      this.setState({
        rating,
      });
    }
  }

  onMouseEnter = (ev) => {
    const hover = +ev.currentTarget.getAttribute('data-rating');

    this.setState({
      hover,
    });
  }

  onMouseLeave = () => {
    this.setState({
      hover: null,
    });
  }

  onClick = (ev) => {
    const { onChange } = this.props;

    const rating = +ev.currentTarget.getAttribute('data-rating');

    this.setState({
      rating,
    });

    if (isFunction(onChange)) {
      onChange(rating);
    }
  }

  render() {
    const { className, number = true, readOnly } = this.props;

    const { hover } = this.state;

    const rating = hover || this.state.rating;

    const rate = [];

    const fullRating = round(rating);

    let dataRating = 0;

    let ratingPoints = fullRating;
    while (ratingPoints-- > 0) {
      rate.push(
        <Star
          key={ratingPoints}
          className={cx(styles.star, STAR)}
          data-rating={readOnly ? null : ++dataRating}
          onClick={readOnly ? null : this.onClick}
          onMouseEnter={readOnly ? null : this.onMouseEnter}
        />,
      );
    }

    ratingPoints = 5 - fullRating;
    while (ratingPoints-- > 0) {
      rate.push(
        <Star
          key={fullRating + ratingPoints}
          className={cx(styles.star, styles.empty, STAR)}
          data-rating={readOnly ? null : ++dataRating}
          onClick={readOnly ? null : this.onClick}
          onMouseEnter={readOnly ? null : this.onMouseEnter}
        />,
      );
    }

    return (
      <div className={className}>

        <span
          className={cx(styles.rate, {
            [POINTER]: !readOnly,
          })}
          onMouseLeave={readOnly ? null : this.onMouseLeave}
        >
          {rate}
        </span>

        {number && rating !== 0 && (
          <span key={-1} className={styles.rating}>
            {rating.toFixed(1)}
          </span>
        )}

      </div>
    );
  }
}

export default Rating;
