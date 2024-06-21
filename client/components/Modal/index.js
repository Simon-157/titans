import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  emptyFunc,
  BACKBUTTON,
  CIRCLE,
  CLOSE,
  MOUSEDOWN,
  MOUSEMOVE,
  MOUSEUP,
  SECONDARY,
  TOUCHSTART,
  TOUCHMOVE,
  TOUCHEND,
} from 'defaults';
import { isInside } from 'client/helpers';
import styles from './css/styles.css';

export default class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    wrapClassName: PropTypes.string,
    isCloseButtonInsideContent: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    isCloseButtonInsideContent: false,
    hideCloseButton: false,
    onClose: emptyFunc,
  }

  constructor(props) {
    super(props);

    document.addEventListener(BACKBUTTON, this.back);
    document.addEventListener(MOUSEDOWN, this.mouseDown);
    document.addEventListener(TOUCHSTART, this.mouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener(BACKBUTTON, this.back);
    document.removeEventListener(MOUSEDOWN, this.mouseDown);
    document.removeEventListener(MOUSEMOVE, this.mouseMove);
    document.removeEventListener(MOUSEUP, this.mouseUp);
    document.removeEventListener(TOUCHSTART, this.mouseDown);
    document.removeEventListener(TOUCHMOVE, this.mouseMove);
    document.removeEventListener(TOUCHEND, this.mouseUp);
  }

  mouseDown = () => {
    document.addEventListener(MOUSEMOVE, this.mouseMove);
    document.addEventListener(TOUCHMOVE, this.mouseMove);
    document.addEventListener(MOUSEUP, this.mouseUp);
    document.addEventListener(TOUCHEND, this.mouseUp);
  }

  mouseMove = (ev) => {
    if (isInside(ev.target, [styles.content])) {
      this.moved = true;
    }
  }

  mouseUp = (ev) => {
    const { moved, mouseMove, mouseUp } = this;

    document.removeEventListener(MOUSEMOVE, mouseMove);
    document.removeEventListener(MOUSEUP, mouseUp);

    this.moved = false;

    if (moved) {
      return;
    }

    if (isInside(ev.target, [styles.content])) {
      return;
    }

    const { onClose } = this.props;

    onClose();
  }

  back = (ev) => {
    ev.preventDefault();

    const { onClose } = this.props;

    onClose();
  }

  renderCloseButton = () => {
    return (
      <button
        className={cx(SECONDARY, CIRCLE, CLOSE, styles.close)}
        onClick={this.back}
      >
        <img src={'/img/profile/close.svg'} alt={CLOSE} />
      </button>
    );
  }

  render() {
    const {
      className,
      children,
      wrapClassName,
      isCloseButtonInsideContent,
      hideCloseButton,
    } = this.props;

    return (
      <div className={cx(styles.wrap, wrapClassName)}>

        {!hideCloseButton && !isCloseButtonInsideContent && this.renderCloseButton()}

        <div className={cx(styles.content, className)}>
          {!hideCloseButton && isCloseButtonInsideContent && this.renderCloseButton()}
          {children}
        </div>

      </div>
    );
  }
}
