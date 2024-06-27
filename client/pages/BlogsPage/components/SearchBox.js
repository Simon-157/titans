import React, { Component } from 'react';
import styles from '../css/styles.css';
import { CIRCLE, SECONDARY } from '../../../../defaults';

class SearchBox extends Component {
  render() {
    return (
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search for articles"
          value={this.props.searchQuery}
          onChange={this.props.onSearchChange}
          className={styles.input}
        />
        <button className={`${CIRCLE} ${SECONDARY}`} style={{width:"46px", height:"46px"}}>
          <img src="/img/search.svg" alt="search" width={20} height={20} style={{filter:"invert(100%)"}}/>
        </button>
      </div>
    );
  }
}

export default SearchBox;
