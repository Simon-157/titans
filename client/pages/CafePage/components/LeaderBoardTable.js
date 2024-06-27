import React, { Component } from 'react';
import styles from '../css/leaderboardtable.css';




class DetailedLeaderboard extends Component {
  render() {
    const leaderboardData = [
      { rank: '1ST', player: 'Xcyriz', points: '449 003' },
      { rank: '2ND', player: 'Azuthius', points: '449 003' },
      { rank: '3RD', player: 'crazyelephant681', points: '267 400' },
      { rank: '4TH', player: 'sadpanda176', points: '244 300' },
      { rank: '5TH', player: 'greenkoala518', points: '228 210' },
      { rank: '6TH', player: 'beautifulbutterfly101', points: '211 654' },
      { rank: '7TH', player: 'yellowmouse215', points: '202 325' },
      { rank: '8TH', player: 'silverduck204', points: '196 654' },
      { rank: '9TH', player: 'bluebear234', points: '165 564' },
      { rank: '10TH', player: 'crazyfish228', points: '64 658' },
      { rank: '11TH', player: 'crazyfish228', points: '64 658' },
      { rank: '12TH', player: 'crazyfish228', points: '64 658' },
      { rank: '13TH', player: 'crazyfish228', points: '64 658' },
      { rank: '14TH', player: 'crazyfish228', points: '64 658' },
    ];

    return (
      <div className={styles.detailedLeaderboard}>
       
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div>Rank</div>
            <div>Player</div>
            <div>Points</div>
          </div>
          <div className={styles.tableBody}>
            {leaderboardData.map((entry, index) => (
              <div key={index} className={styles.tableRow}>
                <div>{entry.rank}</div>
                <div>{entry.player}</div>
                <div>{entry.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedLeaderboard;