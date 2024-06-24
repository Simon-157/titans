import React, { Component } from 'react';
import { cafes } from './data';
import styles from './css/styles.css';
import Navbar from '../EventsPage/NavBar';
import HeaderSection from '../EventsPage/HeaderSection';
import LeaderboardBanner from './LeaderboardBanner';
import Footer from '../EventsPage/Footer';
import CafeList from './CafeList';
import RegionFilter from './RegionFilter';

class AllCafes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      region: 'see all regions',
      visibleCafes: 12,
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleRegionChange = (region) => {
    this.setState({ region });
  };

  loadMoreCafes = () => {
    this.setState((prevState) => ({ visibleCafes: prevState.visibleCafes + 12 }));
  };

  render() {
    const { searchQuery, region, visibleCafes } = this.state;
    const filteredCafes = cafes.filter((cafe) => {
      const matchesSearchQuery = cafe.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = region === 'see all regions' || cafe.region === region;
      return matchesSearchQuery && matchesRegion;
    });

    return (
      <main className={styles.cafePageWrapper}>
        <Navbar />
        <HeaderSection />
        <LeaderboardBanner />
        <div className={styles.allCafes}>
          <section className={styles.searchSection}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search Café"
                value={searchQuery}
                onChange={this.handleSearchChange}
                className={styles.input}
              />
            </div>
            <header className={styles.header}>
              <img src='/img/box-icon.png' alt="box icon" /> 
              <h1>All Cafés</h1>
            </header>
            <RegionFilter currentRegion={region} onRegionChange={this.handleRegionChange} />
          </section>
          <CafeList cafes={filteredCafes} visibleCafes={visibleCafes} loadMoreCafes={this.loadMoreCafes} />
        </div>
        <Footer />
      </main>
    );
  }
}

export default AllCafes;
  