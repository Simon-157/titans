import React, { Component } from "react";
import styles from "../css/styles.css";

class CafeCard extends Component {
  render() {
    const { name, location, image, distance} = this.props;
    return (
      <main className={styles.cafeCardWrapper}>
        <div className={styles.tagCard}>{distance}</div>
        <div className={styles.cafeCard}>
          <img src={image} alt={name} className={styles.image} />
          <div className={styles.info}>
            <h3>{name}</h3>
            <p>{location}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default CafeCard;
