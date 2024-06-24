import React, { Component } from 'react';
import { cafes } from './data';
import styles from './css/styles.css';
import { TERTIARY } from '../../../defaults';
import Navbar from '../EventsPage/NavBar';
import HeaderSection from '../EventsPage/HeaderSection';
import LeaderboardBanner from './LeaderboardBanner';
import Footer from '../EventsPage/Footer';

class CafeCard extends Component {
  render() {
    const { name, location, image } = this.props;
    return (
      <div className={styles.cafeCard}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.info}>
          <h3>{name}</h3>
          <p>{location}</p>
        </div>
      </div>
    );
  }
}

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
               <img src='/img/box-icon.png' /> <h1>All Cafés</h1>
            </header>
            <div className={styles.regionFilters}>
              {['see all regions', 'north', 'south', 'east', 'west'].map((region) => (
                <button
                  key={region}
                  className={this.state.region === region ? styles.active : ''}
                  onClick={() => this.handleRegionChange(region)}
                >
                  {region.charAt(0).toUpperCase() + region.slice(1)}
                </button>
              ))}
            </div>
          </section>
          <section className={styles.cafeGrid}>
            {filteredCafes.slice(0, visibleCafes).map((cafe) => (
              <CafeCard key={cafe.id} {...cafe} />
            ))}
          </section>
          {visibleCafes < filteredCafes.length && (
            <button className={`${TERTIARY}`} onClick={this.loadMoreCafes} style={{height:"45px"}}>
              More Cafés
            </button>
          )}
        </div>
        <Footer />
      </main>
    );
  }
}

export default AllCafes;
