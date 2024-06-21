import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import compact from 'lodash/compact';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import {
  ARROW,
  CONTENT,
  ITEM,
  ITEMS,
  LEFT,
  RESIZE,
  RIGHT,
} from 'defaults';
import {
  registerRafCallback,
  unregisterRafCallback,
} from 'client/lib/raf';
import Dot from 'components/Dot';
import Arrow from 'assets/img/back.svg';
import Mini from './Mini';
import styles from './css/styles.css';

class Carousel extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired, // eslint-disable-line
    autoPlay: PropTypes.bool,
    dots: PropTypes.bool,
    mini: PropTypes.bool,
    small: PropTypes.bool,
    setRef: PropTypes.func,
  }

  static defaultProps = {
    autoPlay: true,
    dots: true,
  }

  state = {
    index: 0,
  }

  lastFrame = null

  overwrite = false

  constructor(props) {
    super(props);

    this.prepare(props);
  }

  componentDidMount() {
    registerRafCallback(this.callback);
    window.addEventListener(RESIZE, this.resize);
  }

  componentWillReceiveProps(newProps) {
    this.prepare(newProps);
  }

  componentWillUnmount() {
    unregisterRafCallback(this.callback);
    window.removeEventListener(RESIZE, this.resize);
  }

  prepare(props) {
    const { children } = props;

    if (isArray(children)) {
      this.children = compact(children);
    } else {
      this.children = [children];
    }
  }

  resize = () => {
    this.setState({
      index: 0,
    });
  }

  callback = (now) => {
    const { autoPlay } = this.props;

    const { children } = this;

    if (!autoPlay || children.length === 0) {
      return;
    }

    if (this.overwrite) {
      this.lastFrame = now;

      this.overwrite = false;

      return;
    }

    this.lastFrame = this.lastFrame || now;

    if ((now - this.lastFrame) < 5000) {
      return;
    }

    this.lastFrame = now;

    this.next();
  }

  prev = () => {
    const { index } = this.state;

    const { children } = this;

    this.setState({
      index: index === 0 ? children.length - 1 : index - 1,
    });

    this.overwrite = true;
  }

  next = () => {
    const { index } = this.state;

    const { children } = this;

    this.setState({
      index: index === children.length - 1 ? 0 : index + 1,
    });

    this.overwrite = true;
  }

  setIndex = (index) => {
    this.setState({
      index,
    });

    this.overwrite = true;
  }

  ref = (c) => {
    const { setRef } = this.props;

    if (isFunction(setRef)) {
      setRef(c);
    }
  }

  renderDots() {
    const { index } = this.state;

    const { children } = this;

    const childrenLength = children.length;

    const dots = [];

    for (let i = 0; i < childrenLength; i++) {
      dots.push(
        <Dot
          key={i}
          active={index === i}
          index={i}
          setIndex={this.setIndex}
        />,
      );
    }

    return (
      <div className={styles.dots}>
        {dots}
      </div>
    );
  }

  renderMini() {
    const { index } = this.state;

    const { children } = this;

    const childrenLength = children.length;

    const mini = [];

    for (let i = 0; i < childrenLength; i++) {
      const child = children[i];

      mini.push(
        <Mini
          key={i}
          active={index === i}
          index={i}
          setIndex={this.setIndex}
        >
          {child}
        </Mini>,
      );
    }

    return mini;
  }

  render() {
    const { className, dots, mini, small } = this.props;

    const { index } = this.state;

    const { children } = this;

    const { length } = children;

    return (
      <div
        className={cx(styles.carousel, className, {
          [styles.small]: small,
          [styles.withMini]: mini,
        })}
        ref={this.ref}
      >

        <div className={cx(CONTENT, styles.content)}>
          <div
            className={cx(styles.items, ITEMS)}
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {map(children, (item, key) => {
              return (
                <div
                  key={key}
                  className={cx(styles.item, ITEM)}
                  style={{
                    transform: `translateX(${key * 100}%)`,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {length > 1 && (
          <>

            <div
              className={cx(ARROW, LEFT, styles.arrow, styles.left)}
              onClick={this.prev}
            >
              <Arrow />
            </div>

            <div
              className={cx(ARROW, RIGHT, styles.arrow, styles.right)}
              onClick={this.next}
            >
              <Arrow />
            </div>

            {mini && (
              <div className={styles.mini}>
                {this.renderMini()}
              </div>
            )}

            {dots && this.renderDots()}

          </>
        )}

      </div>
    );
  }
}

export default Carousel;
