import React, { Component } from 'react';
import CafeDetails from './CafeDetails';
import { cafe } from './data';
import CafeBannerCard from './CafeBannerCard';
import styles from './css/styles.css';
import Navbar from '../EventsPage/NavBar';
import CafeEvents from './CafeEvents';
import Leaderboard from './LeaderBoard';
import DetailedLeaderboard from './LeaderBoardTable';

class CafeDetailsPage extends Component {


    render() {
        return (
            <main className={styles.cafePageWrapper}>
                <Navbar />
                <section className={styles.cafeDetails}>
                    <CafeBannerCard cafe={cafe} />
                    <CafeEvents events={cafe.events} />
                    <Leaderboard />
                </section>
                    <DetailedLeaderboard />

            </main>
        );
    }
}

export default CafeDetailsPage
