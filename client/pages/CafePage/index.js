import React, { Component } from 'react';
import CafeDetails from './CafeDetails';
import { cafe } from './data';

class CafeDetailsPage extends Component {
    render() {
        return (
            <div className="App">
                <CafeDetails />
            </div>
        );
    }
}

export default CafeDetailsPage
