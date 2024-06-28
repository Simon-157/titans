import React, { Component } from 'react';
import EventsSection from './components/EventsSection';
import Footer from './components/Footer';
import styles from './css/styles.css';
import HeaderSection from './components/HeaderSection';
import SearchBar from './components/SearchBar';
import Navbar from './components/NavBar';
import TimerSection from './components/TimerSection';

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
