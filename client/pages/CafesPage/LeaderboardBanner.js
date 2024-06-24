import React, { Component } from 'react';
import styles from './css/banner.css';
import { TERTIARY } from '../../../defaults';

class LeaderboardBanner extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <div className={styles.content}>
            <h2>JOIN YOUR LOCAL CAFE'S LEADERBOARD</h2>
            <button className={`${TERTIARY}`} style={{height:"40PX"}}>JOIN</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderboardBanner;
