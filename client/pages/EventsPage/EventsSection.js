import React, { Component } from 'react';
import EventCard from './EventCard';
import styles from './css/styles.css';

class EventsSection extends Component {
  render() {
    const events = [
      { title: "SEKIRO", location: "London", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit" , image:"/img/OW.png"},
      { title: "MEETUP", location: "Jaipur", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit" , image:"/img/OW.png"},
      { title: "LUCKNOW", location: "Surat", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit" , image:"/img/OW-1.png"},
      { title: "HAVOC", location: "Bangalore", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit", image:"/img/OW.png" },
      { title: "SEKIRO", location: "London", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit", image:"/img/OW-1.png" },
      { title: "BANGALORE", location: "Jaipur", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit", image:"/img/OW.png" },
      { title: "KERNES", location: "Surat", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit" , image:"/img/OW-1.png"},
      { title: "HAVOC", location: "Bangalore", date: "Aug 29th, 2024", time: "17:00-22:00", details: "Lorem ipsum dolor sit", image:"/img/OW.png" },
    ];

    return (
      <section className={styles.eventsSection}>
        <div className={styles.eventsSection__events}>
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>
    );
  }
}

export default EventsSection;

