import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './css/regionfilter.css';

class RegionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 768,
    };
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { currentRegion, onRegionChange } = this.props;
    const { isMobile } = this.state;
    const regions = ['see all regions', 'north', 'south', 'east', 'west'];

    return (
      <div className={styles.regionFilters}>
        {isMobile ? (
          <div className={styles.selectWrapper}>
            <select
              value={currentRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              className={styles.select}
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region.charAt(0).toUpperCase() + region.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ) : (
          regions.map((region) => (
            <button
              key={region}
              className={currentRegion === region ? styles.active : ''}
              onClick={() => onRegionChange(region)}
            >
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </button>
          ))
        )}
      </div>
    );
  }
}

RegionFilter.propTypes = {
  currentRegion: PropTypes.string.isRequired,
  onRegionChange: PropTypes.func.isRequired,
};

export default RegionFilter;
