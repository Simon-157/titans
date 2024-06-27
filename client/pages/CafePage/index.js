import React, { Component } from "react";
import CafeDetails from "./components/CafeDetails";
import { cafe } from "./data";
import CafeBannerCard from "./components/CafeBannerCard";
import styles from "./css/styles.css";
import Navbar from "../EventsPage/NavBar";
import CafeEvents from "./components/CafeEvents";
import Leaderboard from "./components/LeaderBoard";
import DetailedLeaderboard from "./components/LeaderBoardTable";
import { SECONDARY } from "../../../defaults";

class CafeDetailsPage extends Component {
  render() {
    return (
      <main className={styles.cafePageWrapper}>
        <Navbar />

        <div className={styles.back}>
          <button
            className={SECONDARY}
            style={{ height: "40px", fontSize: "1em", padding: "25px" }}
            onClick={() => this.props.history.goBack()}
          >
            <span>
              <img src="/img/back.png" alt="back" />
            </span>
            {`BACK`}
          </button>
        </div>
        <section className={styles.cafeDetails}>
          <CafeBannerCard cafe={cafe} />
          <CafeEvents events={cafe.events} />
          <Leaderboard />
        </section>
        <DetailedLeaderboard />
      </main>
    );
  }
}

export default CafeDetailsPage;
