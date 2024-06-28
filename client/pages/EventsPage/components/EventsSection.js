import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import styles from '../css/styles.css';
import { events } from '../data';

class EventsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      eventsPerPage: 8,
    };
  }

  handleClickNext = () => {
    const { currentPage } = this.state;
    const totalPages = Math.ceil(this.events.length / this.state.eventsPerPage);
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  handleClickPrev = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  render() {
    const { currentPage, eventsPerPage } = this.state;

    this.events = events; 

    // Calculating the indices for the current page
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
      <div className={styles.eventsSectionWrapper}>
        <section className={styles.eventsSection}>
          <div className={styles.eventsSection__header}>

          </div>
          <div className={styles.eventsSection__events}>
            {currentEvents.map((event, index) => (
              <Link to={`/event/${event.id}`} key={index}>
                <EventCard event={event} />
              </Link>
            ))}
          </div>
          <div className={styles.pagination}>
            <button onClick={this.handleClickPrev} disabled={currentPage === 1}>
              &lt;
            </button>
            <div className={styles.paginationDots}>
              {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
                <span key={i} className={currentPage === i + 1 ? styles.active : ''}></span>
              ))}
            </div>
            <button onClick={this.handleClickNext} disabled={currentPage === Math.ceil(events.length / eventsPerPage)}>
              &gt;
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default EventsSection;
