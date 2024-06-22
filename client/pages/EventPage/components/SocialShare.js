import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  AUTO,
  CLICK,
  COPY,
  FACEBOOK,
  ICON,
  LIST,
  RESIZE,
  SHARE,
  TRANSPARENT,
  TWITTER,
} from 'defaults';
import { share } from 'client/lib/share';
import { randomId } from 'lib/random';
import { copyText, isInside } from 'client/helpers';
import ShareIcon from 'assets/img/share.svg';
import styles from '../css/styles.css';
import { TERTIARY } from '../../../../defaults';

class SocialShare extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
    right: PropTypes.bool,
    onClick: PropTypes.func,
    t: PropTypes.func,
  }

  state = {
    show: false,
  }

  className = randomId()

  ref = (c) => {
    this.c = c;
  }

  componentWillUnmount() {
    document.removeEventListener(CLICK, this.clickout);
    document.removeEventListener(RESIZE, this.resize);
  }

  resize = () => {
    const el = this.c;

    if (!el) {
      return;
    }

    const { innerHeight, innerWidth } = window;

    const {
      height,
      left,
      top,
      width,
    } = el.getBoundingClientRect();

    const bottom = innerHeight - top - height;
    const right = innerWidth - left - width;

    if (top < 0) {
      el.style.bottom = AUTO;
      el.style.top = 0;
    } else if (bottom < 0) {
      el.style.bottom = '50px';
      el.style.top = AUTO;
    }

    if (left < 0) {
      el.style.left = 0;
      el.style.right = AUTO;
    } else if (right < 0) {
      el.style.left = AUTO;
      el.style.right = 0;
    }
  }

  share = (platform) => {
    const { text, url } = this.props;

    this.toggleBtns();

    share({ platform, text, url });
  }

  shareTwitter = () => {
    this.share(TWITTER);
  }

  shareFacebook = () => {
    this.share(FACEBOOK);
  }

  copy = () => {
    const {
      url = `${location.origin}${location.pathname}`,
    } = this.props;

    this.toggleBtns();

    copyText(url);
  }

  toggleBtns = (ev) => {
    if (ev && navigator.share) {
      const { text, url } = this.props;

      share({ nativeShare: true, text, url });

      return;
    }

    const { show } = this.state;

    this.setState({ show: !show }, () => {
      if (!show) {
        this.resize();
        document.addEventListener(CLICK, this.clickout);
        document.addEventListener(RESIZE, this.resize);
      } else {
        document.removeEventListener(CLICK, this.clickout);
        document.removeEventListener(RESIZE, this.resize);
      }
    });
  }

  clickout = (ev) => {
    if (isInside(ev.target, [this.className])) {
      return;
    }

    this.setState({
      show: false,
    });
  }

  render() {
    const { className, children, right, onClick, t } = this.props;

    const { show } = this.state;

    return (
      <div
        className={cx(styles.share, SHARE, className, this.className)}
        onClick={onClick}
      >

        <button
          className={cx(TERTIARY, {
            [styles.shareBtn]: !children,
          })}
          onClick={this.toggleBtns}
          style={{
              width: "75%",
                height: "50px",
                fontSize: "1em",
                fontWeight: "bold",
          }}
        >

          <ShareIcon className={cx(styles.icon, ICON)} />

          {children && (
            <span>
              {children}
            </span>
          )}

        </button>


        <div
          className={cx(styles.btnList, LIST, {
              [styles.show]: show,
            })}
            ref={this.ref}
            >

            <h2>Share With Friends </h2>
            <div className={styles.btns}>

          <button
            className={cx(TRANSPARENT, styles.btn)}
            onClick={this.shareTwitter}

          >
            <img src="/img/twitter.svg" alt="Twitter" />
          </button>

          <button
            className={cx(TRANSPARENT, styles.btn)}
            onClick={this.shareFacebook}
          >
            <img src="/img/facebook.svg" alt="Facebook" />
          </button>

          <button
            className={cx(TRANSPARENT, styles.btn)}
            onClick={this.copy}
          >
            <img src="/img/copy.svg" alt="Copy" />
          </button>

        </div>
          <div className={styles.eventUrl}>
            <input type="text" value={this.props.url} readOnly />
            <button onClick={this.copy}>
              <img src="/img/copy.svg" alt="Copy" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialShare;
