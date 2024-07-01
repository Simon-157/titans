import React, { Component } from "react";
import { cafe } from "./data";
import CafeBannerCard from "./components/CafeBannerCard";
import styles from "./css/styles.css";
import Navbar from "../EventsPage/components/NavBar";
import CafeEvents from "./components/CafeEvents";
import Leaderboard from "./components/LeaderBoard";
import DetailedLeaderboard from "./components/LeaderBoardTable";
import { SECONDARY } from "../../../defaults";
import Footer from "../EventsPage/components/Footer";

class CafeDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.backButtonRef = React.createRef();
  }

  render() {
    return (
      <main className={styles.cafePageWrapper}>
        <Navbar />

        <div className={styles.back} ref={this.backButtonRef}>
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
          <Leaderboard backButtonRef={this.backButtonRef} />
        </section>
        <DetailedLeaderboard />
        <Footer />
      </main>
    );
  }
}

export default CafeDetailsPage;
