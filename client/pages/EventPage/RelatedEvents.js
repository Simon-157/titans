import React, { Component } from 'react';
import EventCard from '../EventsPage/components/EventCard';
import styles from './css/styles.css';
import { SECONDARY, TERTIARY } from 'defaults';

class RelatedEvents extends Component {
  render() {

    const { events, visibleEvents, loadMoreEvents } = this.props;

    return (
      <div className={styles.relatedEvents}>
        <div className={styles.eventCards}>
          
          {events.slice(0, visibleEvents).map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', padding:"20px" }}>
           {visibleEvents < events.length && (
            <button
              className={`${TERTIARY}`}
              onClick={loadMoreEvents}
              style={{ height: '45px', padding:'30px'}}
            >
              MORE EVENTS
            </button>
          )}

        </div>
      </div>
    );
  }
}

export default RelatedEvents;
