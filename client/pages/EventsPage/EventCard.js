import React, { Component } from 'react';
import styles from './css/styles.css';

class EventCard extends Component {
  render() {
    const { image, title, location, date, time, details } = this.props.event;
    return (
      <div className={styles.eventCard}>
        <div className={styles.eventCard__image}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.eventCard__content}>
          <h3>{title}</h3>
          <div className={styles.detail}>
            <img src='/img/clockSimple.svg' alt='time' width={16} className={styles.icon} />
            <p>{date} | {time}</p>
          </div>
          <div className={styles.detail}>
            <img src='/img/marker.svg' alt='location' width={16} className={styles.icon} />
            <p>{location}</p>
          </div>
          <div className={styles.detail}>
            <img src='/img/home-icon.svg' alt='details' width={16} className={styles.icon} />
            <p>{details}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCard;
