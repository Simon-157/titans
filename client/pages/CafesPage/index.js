import React, { Component } from "react";
import { cafes } from "./data";
import styles from "./css/styles.css";
import Navbar from "../EventsPage/components/NavBar";
import HeaderSection from "../EventsPage/components/HeaderSection";
import LeaderboardBanner from "./components/LeaderboardBanner";
import Footer from "../EventsPage/components/Footer";
import CafeList from "./components/CafeList";
import RegionFilter from "./components/RegionFilter";
import SearchBox from "../EventsPage/components/SearchBox";

class AllCafes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      region: "see all regions",
      visibleCafes: 6,
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleRegionChange = (region) => {
    this.setState({ region });
  };

  loadMoreCafes = () => {
    this.setState((prevState) => ({
      visibleCafes: prevState.visibleCafes + 6,
    }));
  };

  render() {
    const { searchQuery, region, visibleCafes } = this.state;
    const filteredCafes = cafes.filter((cafe) => {
      const matchesSearchQuery = cafe.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRegion =
        region === "see all regions" || cafe.region === region;
      return matchesSearchQuery && matchesRegion;
    });

    return (
      <main className={styles.cafePageWrapper}>
        <Navbar />
        <div className={styles.headerSection}>
         <HeaderSection />
        </div>
        <LeaderboardBanner />
        <div className={styles.allCafes}>
          <section className={styles.searchSection}>
            <div style={{margin:"40px 0px"}}>
              <SearchBox />
            </div>

            <header className={styles.header}>
              <img src="/img/box-icon.png" alt="box icon" />
              <h1>All Cafés</h1>
            </header>
          </section>
            <RegionFilter
              currentRegion={region}
              onRegionChange={this.handleRegionChange}
            />
          <CafeList
            cafes={filteredCafes}
            visibleCafes={visibleCafes}
            loadMoreCafes={this.loadMoreCafes}
          />
        </div>
        <Footer />
      </main>
    );
  }
}

export default AllCafes;
