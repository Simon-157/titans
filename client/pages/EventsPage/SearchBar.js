import React, { Component } from 'react';
import styles from './css/styles.css';

class SearchBar extends Component {
    render() {
        return (
            <div className={styles.searchBar}>
            <div className={styles.regionSearch}>
                <select className={styles.regionSearch__dropdown}>
                    <option value="region">REGION</option>
                    <option value="region">REGION</option>
                    <option value="region">REGION</option>
                    <option value="region">REGION</option>
                </select>
                <div className={styles.regionSearch__inputContainer}>
                    <input
                        type="text"
                        placeholder="Search Event"
                        className={styles.regionSearch__input}
                    />
                    <button className={styles.regionSearch__button}>
                        <img src="/img/search.svg" alt="search" />
                    </button>
                </div>
            </div>
            </div>
        );
    }
}

export default SearchBar;
