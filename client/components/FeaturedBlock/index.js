import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import {
  ARROW,
  ARROWS,
  FEATURED,
  H1_LARGE,
  RESIZE,
  SUBTITLE,
} from 'defaults';
import StatusMessage from 'components/StatusMessage';
import Dot from 'components/Dot';
import Arrow from 'assets/img/back.svg';
import FeaturedSub from './FeaturedSub';
import styles from './css/styles.css';

class FeaturedBlock extends Component {
  static displayName = 'FeaturedBlock'

  static propTypes = {
    btn: PropTypes.string,
    btnClassname: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    dots: PropTypes.bool,
    entity: PropTypes.string,
    path: PropTypes.string,
    privateSub: PropTypes.bool,
    props: PropTypes.object,
    sub: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    statusTitle: PropTypes.string,
    statusMessage: PropTypes.string,
    t: PropTypes.func,
  }

  static defaultProps = {
    dots: true,
  }

  state = {
    count: 1,
    length: 0,
    offset: 0,
  }

  componentDidMount() {
    window.addEventListener(RESIZE, this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.resize);
  }

  resize = () => {
    if (!this.items) {
      return;
    }

    const width = this.items.offsetWidth;

    const windowWidth = window.innerWidth;

    let itemWidth;
    if (windowWidth > 899) {
      itemWidth = 365;
    } else {
      itemWidth = 300;
    }

    let count = (width / (itemWidth + 20)) | 0;
    if (count === 0) {
      count = 1;
    }

    this.setState({
      count,
      offset: 0,
    });
  }

  setLength = (length) => {
    const { length: currentLength } = this.state;

    if (length === currentLength) {
      return;
    }

    this.setState({ length });
  }

  prev = () => {
    const { offset } = this.state;

    if (offset === 0) {
      return;
    }

    this.setState({
      offset: offset - 1,
    });
  }

  next = () => {
    const { count } = this.state;

    const { offset, length } = this.state;

    if (length <= ((offset + 1) * count)) {
      return;
    }

    this.setState({
      offset: offset + 1,
    });
  }

  setIndex = (offset) => {
    this.setState({
      offset,
    });
  }

  itemsRef = (c) => {
    this.items = c;

    this.resize();
  }

  renderDots() {
    const { count, offset, length } = this.state;

    const childrenLength = Math.ceil(length / count);

    const dots = [];

    for (let i = 0; i < childrenLength; i++) {
      dots.push(
        <Dot
          key={i}
          active={offset === i}
          index={i}
          setIndex={this.setIndex}
        />,
      );
    }

    return dots;
  }

  renderFeaturedSub() {
    const {
      entity,
      privateSub,
      props,
      sub,
      t,
    } = this.props;

    const { count, offset } = this.state;

    return (
      <FeaturedSub
        count={count}
        entity={entity}
        limit={(count * 2) + (offset * count)}
        offset={offset}
        parent={this}
        privateSub={privateSub}
        props={props}
        sub={sub}
        setLength={this.setLength}
        t={t}
      />
    );
  }

  renderSub() {
    const { sub } = this.props;

    if (!sub) {
      return null;
    }

    const { count, offset, length } = this.state;

    if (length === 0) {
      return this.renderFeaturedSub();
    }

    const prevActive = offset !== 0;
    const nextActive = length > ((offset + 1) * count);

    return sub && (
      <div
        className={styles.itemsWrap}
        ref={this.itemsRef}
      >

        {this.renderFeaturedSub()}

        <div className={ARROWS}>

          <div
            className={cx(ARROW, styles.arrow, styles.left, {
              [styles.active]: prevActive,
            })}
            onClick={this.prev}
          >
            <Arrow />
          </div>

          <div
            className={cx(ARROW, styles.arrow, styles.right, {
              [styles.active]: nextActive,
            })}
            onClick={this.next}
          >
            <Arrow />
          </div>

        </div>

      </div>
    );
  }

  render() {
    const {
      btn,
      btnClassname,
      children,
      className,
      color,
      dots,
      entity,
      path,
      subtitle,
      title,
      statusTitle,
      statusMessage,
      t,
    } = this.props;

    const { length } = this.state;

    if (global.__CLIENT__ && length === 0) {
      if (statusTitle) {
        return (
          <div
            className={cx(
              FEATURED,
              styles.featured,
              styles[entity],
              className,
            )}
          >

            {title && (
              <h2
                className={cx(H1_LARGE, styles.title, {
                  [color]: color,
                })}
              >
                {title}
              </h2>
            )}

            <br />
            <br />

            <StatusMessage
              title={t(statusTitle)}
              message={statusMessage}
            />

            {this.renderSub()}

          </div>
        );
      }

      return this.renderSub();
    }

    return (
      <div
        className={cx(
          FEATURED,
          styles.featured,
          styles[entity],
          className,
        )}
      >

        {children}

        {title && (
          <h2
            className={cx(H1_LARGE, styles.title, {
              [color]: color,
            })}
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <h3 className={cx(SUBTITLE, styles.subtitle)}>
            {subtitle}
          </h3>
        )}

        {this.renderSub()}

        {dots && (
          <div className={styles.dots}>
            {this.renderDots()}
          </div>
        )}

        {btn && (
          <Link
            className={styles.btn}
            to={`/${path}`}
          >
            <button className={styles[btnClassname]}>
              {btn}
            </button>
          </Link>
        )}

      </div>
    );
  }
}

export default FeaturedBlock;
