import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { emptyNullFunc, BLANK } from 'defaults';
import styles from './css/styles.css';

class Footer extends Component {
  static propTypes = {
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {}

  date = new Date().getFullYear()

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('wheel', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('wheel', this.onScroll);
  }

  onScroll = () => {
    if (this.state.isOpened) {
      return;
    }

    this.setState({
      isOpened: true,
    });

    setTimeout(() => {
      this.setState({
        isOpened: false,
      });
    }, 3000);
  }

  render() {
    const { t } = this.props;

    const { isOpened } = this.state;

    return (
      <div
        className={cx(styles.footer, {
          [styles.opened]: isOpened,
        })}
      >
        <div className={styles.footerContent}>
          <div className={styles.wrapper}>

            <div className={styles.point}>
              .
            </div>

            <div className={styles.linkBlock}>
              <a href={'/documents/privacy.pdf'} target={BLANK}>
                {t(['privacyPolicy'])}
              </a>
            </div>

            <div className={styles.point}>
              .
            </div>

            <div className={styles.linkBlock}>
              <a href={'/documents/terms.pdf'} target={BLANK}>
                {t(['termsOfService'])}
              </a>
            </div>

            <div className={styles.point}>
              .
            </div>

            <div className={styles.linkBlock}>
              <span className={styles.year}>
                ©{this.date}
              </span>
            </div>

            <div className={styles.point}>
              .
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
