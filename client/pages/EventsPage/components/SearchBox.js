import React, { Component } from 'react';
import styles from '../css/styles.css';
import Input from '../../../components/Input';
import { CIRCLE } from 'react-google-maps/lib/constants';
import { SECONDARY, TERTIARY } from '../../../../defaults';

class SearchBox extends Component {
    
    render() {
        const locationPath = window.location.pathname.split('/')[1];
        
        
        return (

            <div className={styles.regionSearch__inputContainer}>
                <Input
                    
                    className={styles.regionSearch__input}
                    type="text"
                    placeholder={`Search ${locationPath}`}

                //   onChange={(value) => this.handleInputChange(value, 'userEmail')}
                />
                <div className={styles.regionSearch__button}>
                    <button className={`${CIRCLE} ${SECONDARY}`} style={{ width: '40px', height: '40px', padding: '5px',  }}>
                        <img src="/img/search.svg" alt="search" />
                    </button>

                </div>
            </div>

        );
    }
}

export default SearchBox;
