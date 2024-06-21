import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MOUSE,
  LOGO,
} from 'defaults';
import { Link } from 'react-router-dom';
import styles from './css/home.css';

class Home extends Component {
  static displayName = 'Home'

  static propTypes = {
    t: PropTypes.func,
  }

  render() {
    const { t } = this.props;

    return (
      <div className={styles.homePage}>

        <div className={styles.ellipse} />

        <div className={styles.homePageHeader}>

          <Link to={'/'}>

            <img
              src={'/img/logo.svg'}
              alt={LOGO}
            />

          </Link>

        </div>

        <h1 className={styles.homePageContent}>

          <div>
            {t(['explore'])}
          </div>

          <div>

            <span>
              {t(['the'])}&nbsp;
            </span>

            <span className={styles.worldOfEreo}>

              <span>
                {t(['worldOf'])}&nbsp;
              </span>

              <span className={styles.ereo}>

                <div className={styles.backlight} />

                {t(['ereo'])}

              </span>

              <div className={styles.backlight} />

            </span>

          </div>

        </h1>

        <div className={styles.homePageFooter}>

          <div>

            <img
              src={'/img/explore/mouse.svg'}
              alt={MOUSE}
            />

          </div>

          <div className={styles.scrollDownText}>
            {t(['scrollDown'])}
          </div>

          <div className={styles.arrows}>

            <div className={styles.arrow}>

              <span></span>

              <span></span>

            </div>

            <div className={styles.arrow}>

              <span></span>

              <span></span>

            </div>

            <div className={styles.arrow}>

              <span></span>

              <span></span>

            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default Home;
