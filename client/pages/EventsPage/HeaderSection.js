import React, { Component } from 'react';
import styles from './css/styles.css';

class HeaderSection extends Component {
  render() {
    return (
      <div className={styles.headerSectionWrapper}>
      <div className={styles.headerSection}>
        {/* <div className={styles.headerSection__icon}>
          <span>🎮</span>
        </div> */}
        <h1 className={styles.headerSection__title}><span className={styles.headerSection__icon}>🎮</span>EVENTS AROUND YOU</h1>
        <p className={styles.headerSection__subtitle}>
          Come and find the nearest gaming Café around you and participate in their Reign of Titans Tournament. It's <span className={styles.highlight}>absolutely free!</span>
        </p>
      </div>

      </div>
    );
  }
}

export default HeaderSection;
