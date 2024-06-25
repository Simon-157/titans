import React, { Component } from 'react';
import styles from './css/styles.css';
import { FILLED, PRIMARY, SECONDARY, TERTIARY } from '../../../defaults';
import RegisterModal from '../EventPage/components/RegisterForm';

class TimerSection extends Component {

    state = {
    isRegisterModalOpen: false,
  };

  toggleRegisterModal = () => {
    this.setState((prevState) => ({
      isRegisterModalOpen: !prevState.isRegisterModalOpen,
    }));
  };
  render() {

        const { isRegisterModalOpen } = this.state;

    return (
      <div className={styles.timerSectionWrapper}>
      <div className={styles.timerSection}>
        <div className={styles.timerSection__countdown}>
          <div className={styles.timerBox}>
            <span>18</span>
            <small>DAYS</small>
          </div>
          <div className={styles.timerBox}>
            <span>32</span>
            <small>HRS</small>
          </div>
          <div className={styles.timerBox}>
            <span>12</span>
            <small>MIN</small>
          </div>
          <div className={styles.timerBox}>
            <span>52</span>
            <small>SEC</small>
          </div>
        </div>
        <div className={styles.timerSection__details}>
          <h2>SEKIRO CHAMPIONSHIP - OFFICIAL WATCH PARTY</h2>
          <p>
            Esports will be the biggest source of entertainment during this next decade with <span className={styles.highlight}>3.2 billion gamers</span> worldwide. Tournaments already sell-out massive arenas and fans spend huge amounts of time watching others play from the comfort of their homes.
          </p>
          <div className={styles.timerSection__info}>
            <div className={styles.infoItem}>
              <img src="/img/clockSimple.svg" alt="date" className={styles.icon} />
              <span>AUG 29TH, 2022 | 17:00-22:00</span>
            </div>
            <div className={styles.infoItem}>
              <img src="/img/home-icon.svg" alt="location" className={styles.icon} />
              <span>BIG CHILL KINGS CROSS</span>
            </div>
            <div className={styles.infoItem}>
              <img src="/img/marker-icon.svg" alt="address" className={styles.icon} />
              <span>9 DALSTON LANE, HACKNEY, LONDON, E8 1PG, UNITED KINGDOM</span>
            </div>
          </div>
          <div className={styles.timerSection__actions}>
            <button className={`${TERTIARY} `} style={{ height: '70px' , width: '250px', fontSize: '20px'}}>SHARE</button>
            <button className={`${PRIMARY}`} style={{ height: '70px' , width: '250px', fontSize: '20px'}} onClick={this.toggleRegisterModal} >JOIN EVENT</button>
          </div>
        </div>
      </div>

        <RegisterModal isOpen={isRegisterModalOpen} onClose={this.toggleRegisterModal} />

      </div>
    );
  }
}

export default TimerSection;
