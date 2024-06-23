import React, { Component } from 'react';
import CafeCard from './CafeCard';
import { cafes } from './data';
import styles from './AllCafes.module.scss';


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
      region: 'all',
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleRegionChange = (region) => {
    this.setState({ region });
  };

  render() {
    const { searchQuery, region } = this.state;
    const filteredCafes = cafes.filter((cafe) => {
      const matchesSearchQuery = cafe.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = region === 'all' || cafe.region === region;
      return matchesSearchQuery && matchesRegion;
    });

    return (
      <div className={styles.allCafes}>
        <header className={styles.header}>
          <h1>All Cafés</h1>
        </header>
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search Café"
            value={searchQuery}
            onChange={this.handleSearchChange}
            className={styles.searchInput}
          />
          <div className={styles.regionFilters}>
            {['all', 'north', 'south', 'east', 'west'].map((region) => (
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
          {filteredCafes.map((cafe) => (
            <CafeCard key={cafe.id} {...cafe} />
          ))}
        </section>
        <button className={styles.moreCafesBtn}>More Cafés</button>
      </div>
    );
  }
}

export default AllCafes;
