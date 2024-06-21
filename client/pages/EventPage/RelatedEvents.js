import React, { Component } from 'react';
import EventCard from '../EventsPage/EventCard';
import styles from './css/styles.css';
import { SECONDARY } from '../../../defaults';

class RelatedEvents extends Component {
  render() {
    const events = [
      { title: "MEETUP", location: "Jaipur", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit", image: "/img/OW.png" },
      { title: "LUCKNOW", location: "Surat", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit", image: "/img/OW2.png" },
      { title: "KERMES CUP", location: "Surat", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit", image: "/img/OW3.png" },
      { title: "HAVOC", location: "Bangalore", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit", image: "/img/OW-1.png" },
    ];

    return (
      <div className={styles.relatedEvents}>
        <h2>MORE EVENTS YOU MAY LIKE</h2>
        <div className={styles.relatedEvents__nav}>
          <button className={styles.navButton}>SEE ALL REGIONS</button>
          <button className={styles.navButton}>NORTH</button>
          <button className={styles.navButton}>SOUTH</button>
          <button className={styles.navButton}>EAST</button>
          <button className={styles.navButton}>WEST</button>
        </div>
        <div className={styles.eventCards}>
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
        <button className={"tertiary"} style={{ color: '#45E5E5', height: '40px', border: '1px solid #45E5E5', fontSize: '1em', fontWeight: 'bold' }}>MORE EVENTS</button>

        </div>
      </div>
    );
  }
}

export default RelatedEvents;
