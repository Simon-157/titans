import React, { Component } from 'react';
import styles from './css/styles.css';

class Navbar extends Component {
  render() {
    return (
      <header className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <img src="/img/logo-bare.svg" alt="Logo" />
        </div>
        <nav className={styles.navbar__nav}>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}><a href="#">PLAY</a></li>
            <li className={styles.navbar__item}><a href="#">DISCOVER</a></li>
            <li className={styles.navbar__item}><a href="#">BLOG</a></li>
            <li className={styles.navbar__item}><a href="#">EVENTS</a></li>
            <li className={styles.navbar__item}><a href="#">CAFÉS</a></li>
          </ul>
        </nav>
        <div className={styles.navbar__actions}>
          <div className={styles.hdhd}>
            <img src="/img/Language.svg" alt="Language"  className='navbar__icon__language'/>
          </div>
          <div className={styles.navbar__icon}>
            <img src="/img/search.svg" alt="Search" />
          </div>
          <div className={styles.navbar__profile}>
            <img src="/img/profile.svg" alt="Profile" />
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;
