import React, { Component } from "react";
import styles from "../css/styles.css";
import { SECONDARY, TERTIARY } from "defaults";
import EventCard from "../../EventsPage/EventCard";

class CafeEvents extends Component {
  render() {
    const { events } = this.props;

    return (
      <>
        <div className={styles.header}>
          <h2>CAFÉ EVENTS </h2>
          <button className={`${TERTIARY}`} style={{ height: "40px" }}>
            CREATE EVENT
          </button>
        </div>
        <div className={styles.eventCards}>
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </>
    );
  }
}

export default CafeEvents;
