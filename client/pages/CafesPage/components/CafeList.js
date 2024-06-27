import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CafeCard from './CafeCard';
import styles from '../css/grid.css';
import { TERTIARY } from '../../../../defaults';
import { Link } from 'react-router-dom';

class CafeList extends Component {
  render() {
    const { cafes, visibleCafes, loadMoreCafes } = this.props;

    return (
      <>
        <section className={styles.cafeGrid}>
          {cafes.slice(0, visibleCafes).map((cafe) => (
            <Link to={`/cafe/${cafe.id}`} key={cafe.id}>
            <CafeCard key={cafe.id} {...cafe} />
            </Link>
          ))}
        </section>
        <section>
          {visibleCafes < cafes.length && (
            <button
              className={`${TERTIARY}`}
              onClick={loadMoreCafes}
              style={{ height: '50px', margin:'30px 0px', padding:'30px'}}
            >
              More Cafés
            </button>
          )}
        </section>
      </>
    );
  }
}

CafeList.propTypes = {
  cafes: PropTypes.array.isRequired,
  visibleCafes: PropTypes.number.isRequired,
  loadMoreCafes: PropTypes.func.isRequired,
};

export default CafeList;
``
