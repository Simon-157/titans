import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './css/styles.css';

class HeaderSection extends Component {
  
  render() {
    const { location } = this.props;
    const showTitle = location.pathname === '/events';

    return (
      <div className={styles.headerSectionWrapper}>
        <div className={styles.headerSection}>
          {showTitle && (
            <h1 className={styles.headerSection__title}>
              <span className={styles.headerSection__icon}><img src='/img/box-icon.png' alt="box icon" /></span>
              EVENTS AROUND YOU
            </h1>
          )}
          <p className={styles.headerSection__subtitle}>
            Come and find the nearest gaming Café around you and participate in their Reign of Titans Tournament. It's <span className={styles.highlight}>absolutely free!</span>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderSection);
