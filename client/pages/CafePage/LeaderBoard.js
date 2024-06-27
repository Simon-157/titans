import React, { Component } from "react";
import styles from "./css/leaderboard.css";
import { CIRCLE } from "react-google-maps/lib/constants";
import { TERTIARY } from "../../../defaults";

class Leaderboard extends Component {
  render() {
    const leaderboardData = [
      { rank: "1ST", name: "Sp3ct3r", medal: "/img/gold.svg" },
      { rank: "2ND", name: "W1tchdOct0r", medal: "/img/silver.svg" },
      { rank: "3RD", name: "Scrib3", medal: "/img/bronze.svg" },
    ];

    return (
      <div className={styles.leaderboard}>
        <div className={styles.header}>
          <img src="/img/Louvard.png" alt="Titan Tournament" />
          <div className={styles.content}>
            <h2>Leaderboard</h2>
            <p>
              Reign of Titans hosted an online tournament with LouvardGame on
              October 28 & 29. Over the course of two days, 32 of the highest
              ranked global players entered 4 Titans each and battled it out for
              a cash prize pool of €10,500!
            </p>
          </div>
              <span className={styles.scrollUp}>
                    <button
                        className={`${CIRCLE} ${TERTIARY}`}
                        style={{ width: "50px", height: "50px", padding: "5px" ,  }}
                        onClick={this.handleScrollUpButtonClick}
                    >
                        <img src="/img/scrollup.svg" alt="scroll" style={{ width: "25px", height: "25px", marginTop: "20px" }}/>
                    </button>
                </span>
        </div>
        <div className={styles.topRanks}>
          {leaderboardData.map((player) => (
            <div key={player.rank} className={styles.rank}>
              <div className={styles.medal}>
                <img src={player.medal} alt={`${player.rank} medal`} />
                <h3>{`${player.rank}`}</h3>
              </div>
              <p>{player.name}</p>
            </div>
          ))}
        </div>
        <div className={styles.note}>
          The below leaderboard is an accumulation of points based on your 4
          Titans placements in each of the individual blocks and overall
          playoffs.
        </div>
      </div>
    );
  }
}

export default Leaderboard;
