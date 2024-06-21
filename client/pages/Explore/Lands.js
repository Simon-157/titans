import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LAND } from 'defaults';
import Catalog from './Catalog';
import styles from './css/catalog.css';

class Lands extends Component {
  static displayName = 'Lands'

  static propTypes = {
    t: PropTypes.func,
  }

  render() {
    return (
      <Catalog
        className={styles.land}
        type={LAND}
        {...this.props}
      />
    );
  }
}

export default Lands;
