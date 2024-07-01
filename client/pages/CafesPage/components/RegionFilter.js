import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/regionfilter.css';
import Select from '../../../components/Select';
import { SECONDARY } from '../../../../defaults';

class RegionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 768,
      selectedOption: { id: 0, region: "see all regions" },
      options: [
        { id: 0, region: "see all regions" },
        { id: 1, region: "north" },
        { id: 2, region: "south" },
        { id: 3, region: "east" },
        { id: 4, region: "west" },
      ],
    };
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  };

  handleRegionChange = (selectedOption) => {
    if (selectedOption) {
      this.setState({ selectedOption });
      this.props.onRegionChange(selectedOption.region);
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { currentRegion } = this.props;
    const { isMobile, options, selectedOption } = this.state;
    const regions = ['see all regions', 'north', 'south', 'east', 'west'];

    return (
      <>
        {isMobile ? (
          <div className={styles.regionFiltersMobile}>
            <div className={styles.regionSearch}>
              <Select
                className={`${styles.regionSearch__dropdown} ${SECONDARY}`} 
                data={options}
                value={selectedOption.id}
                onChange={(e) => {
                  const selectedId = parseInt(e.currentTarget.value, 10);
                  const selectedOption = options.find(option => option.id === selectedId);
                  this.handleRegionChange(selectedOption || this.state.selectedOption);
                }}
                labelKey="region"
                valueKey="id"
                placeholder={selectedOption.region}
                input={false}
                multiple={false}
              />
            </div>
          </div>
        ) : (
          <div className={styles.regionFilters}>
            {regions.map((region) => (
              <button
                key={region}
                className={currentRegion === region ? styles.active : ''}
                onClick={() => this.props.onRegionChange(region)}
              >
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </button>
            ))}
          </div>
        )}
      </>
    );
  }
}

RegionFilter.propTypes = {
  currentRegion: PropTypes.string.isRequired,
  onRegionChange: PropTypes.func.isRequired,
};

export default RegionFilter;
