import React from 'react';
import cx from 'classnames';
import { BLANK, CENTER, FLEX } from 'defaults';
import styles from './css/styles.css';

function Outdated() {
  return (
    <div className={styles.outdated}>
      <div className={cx(styles.outdatedCont, FLEX, CENTER)}>
        <div>

          <div className={styles.title}>
            Your browser is outdated
          </div>

          <div className={styles.subtitle}>
            Please install one of the following
          </div>

          <div className={styles.outdatedBrowsers}>

            <a
              className={styles.outdatedBrowser}
              href='https://google.com/chrome'
              target={BLANK}
            >

              <div className={cx(styles.outdatedBrowserLogo, styles.chrome)} />

              <div className={styles.outdatedBrowserName}>
                Google Chrome
              </div>

            </a>

            <a
              className={styles.outdatedBrowser}
              href='https://mozilla.org/firefox/new'
              target={BLANK}
            >

              <div className={cx(styles.outdatedBrowserLogo, styles.firefox)} />

              <div className={styles.outdatedBrowserName}>
                Mozilla Firefox
              </div>

            </a>

            <a
              className={styles.outdatedBrowser}
              href='https://apple.com/safari'
              target={BLANK}
            >

              <div className={cx(styles.outdatedBrowserLogo, styles.safari)} />

              <div className={styles.outdatedBrowserName}>
                Safari
              </div>

            </a>

            <a
              className={styles.outdatedBrowser}
              href='https://opera.com/download'
              target={BLANK}
            >

              <div className={cx(styles.outdatedBrowserLogo, styles.opera)} />

              <div className={styles.outdatedBrowserName}>
                Opera
              </div>

            </a>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Outdated;
