import React, { Component } from 'react';
import styles from './css/styles.css';
import Input from '../../components/Input';
import { CIRCLE } from 'react-google-maps/lib/constants';
import { SECONDARY, TERTIARY } from '../../../defaults';
import SearchBox from './SearchBox';

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
                    <SearchBox />
                </div>
            </div>
        );
    }
}

export default SearchBar;
