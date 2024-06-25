import React, { Component } from 'react';
import Navbar from '../EventsPage/NavBar';
import EventDetails from './EventDetails';
import RelatedEvents from './RelatedEvents';
import Footer from '../EventsPage/Footer';
import styles from './css/styles.css';
import { events } from './data';
import RegionFilter from '../CafesPage/RegionFilter';

class SingleEventPage extends Component {
    constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      region: 'see all regions',
      visibleEvents: 4,
    };
  }


  handleRegionChange = (region) => {
    this.setState({ region });
  };

  loadMoreEvents = () => {
    this.setState((prevState) => ({ visibleEvents: prevState.visibleEvents + 4 }));
  };

  getEventById = (id) => { 

    return events.find(event => event.id === parseInt(id));
  };

  render() {
    const { id } = this.props.match.params;
    const event = this.getEventById(id);

    if (!event) {
      return <div>Event not found</div>;
    }

    const { searchQuery, region, visibleEvents } = this.state;
    const filteredEvents = events.filter((event) => {
      const matchesRegion = region === 'see all regions' || event.region === region;
      return  matchesRegion;
    });

    return (
      <div className={styles.app}>
        <Navbar />
        <div className={styles.singleEventWrapper}>
          <EventDetails event={event} />

          <div className={styles.allCafes}>

            <section className={styles.searchSection}>
            
            <header className={styles.header}>
              <img src='/img/box-icon.png' alt="box icon" /> 
              <h1>Events You May Like</h1>
            </header>
            <RegionFilter currentRegion={region} onRegionChange={this.handleRegionChange} />
          </section>
          <RelatedEvents events={filteredEvents}  visibleEvents={visibleEvents} loadMoreEvents={this.loadMoreEvents} />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default SingleEventPage;
