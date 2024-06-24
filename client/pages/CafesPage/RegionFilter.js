import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './css/regionfilter.css';

class RegionFilter extends Component {
  render() {
    const { currentRegion, onRegionChange } = this.props;
    
    return (
      <div className={styles.regionFilters}>
        {['see all regions', 'north', 'south', 'east', 'west'].map((region) => (
          <button
            key={region}
            className={currentRegion === region ? styles.active : ''}
            onClick={() => onRegionChange(region)}
          >
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </button>
        ))}
      </div>
    );
  }
}

RegionFilter.propTypes = {
  currentRegion: PropTypes.string.isRequired,
  onRegionChange: PropTypes.func.isRequired,
};

export default RegionFilter;
