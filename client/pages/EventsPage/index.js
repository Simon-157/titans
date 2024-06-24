import React, { Component } from 'react';
import EventsSection from './EventsSection';
// import Footer from './Footer';
import styles from './css/styles.css';
import HeaderSection from './HeaderSection';
import SearchBar from './SearchBar';
import Navbar from './NavBar';
import TimerSection from './TimerSection';
import Footer from 'app/Footer';

class EventsPage extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Navbar />
        <HeaderSection />
        <SearchBar />
        <TimerSection />  
        <EventsSection />
        <Footer />
      </div>
    );
  }
}

export default EventsPage;
