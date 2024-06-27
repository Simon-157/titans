import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/regionfilter.css';
import Select from '../../../components/Select';
import { FILLED, PRIMARY, SECONDARY, TERTIARY } from '../../../../defaults';

class RegionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 768,
      selectedOption: null,
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
    const { options, selectedOption } = this.state;

    return (
      <>
        {isMobile ? (
          <div className={styles.regionFiltersMobile}>

          <div className={styles.regionSearch}>

            <Select
              className={`${styles.regionSearch__dropdown} ${SECONDARY}`} 
              data={options}
              value={currentRegion}
              onChange={e => onRegionChange(e.target.value)}
              labelKey="region"
              valueKey="id"
              // valueIcon="icon"
              placeholder="REGION"
              input={false}
              multiple={false}
            />

          </div>
          </div>

        ) :
          <div className={styles.regionFilters}>

            {regions.map((region) => (

              <button
                key={region}
                className={currentRegion === region ? styles.active : ''}
                onClick={() => onRegionChange(region)}
              >
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </button>
            ))}
          </div>

        }
      </>
    );
  }
}

RegionFilter.propTypes = {
  currentRegion: PropTypes.string.isRequired,
  onRegionChange: PropTypes.func.isRequired,
};

export default RegionFilter;
