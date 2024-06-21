import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TITAN } from 'defaults';
import Catalog from './Catalog';
import styles from './css/catalog.css';

class Titans extends Component {
  static displayName = 'Titans'

  static propTypes = {
    t: PropTypes.func,
  }

  render() {
    return (
      <Catalog
        className={styles.titan}
        type={TITAN}
        {...this.props}
      />
    );
  }
}

export default Titans;
