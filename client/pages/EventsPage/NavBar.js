import React, { Component } from 'react';
import styles from './css/styles.css';
import cx from 'classnames';
import { CIRCLE, SECONDARY } from '../../../defaults';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = {
    isSideSheetOpen: false,
  };

  toggleSideSheet = () => {
    this.setState((prevState) => ({
      isSideSheetOpen: !prevState.isSideSheetOpen,
    }));
  };

  render() {
    const { isSideSheetOpen } = this.state;

    return (
      <header className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <img src="/img/logo-bare.svg" alt="Logo" />
        </div>
        <nav className={styles.navbar__nav}>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}><a href="#">PLAY</a></li>
            <li className={styles.navbar__item}><a href="#">DISCOVER</a></li>
            <li className={styles.navbar__item}><a href="/blogs">BLOG</a></li>
            <li className={styles.navbar__item}><a href="/events">EVENTS</a></li>
            <li className={styles.navbar__item}><a href="/cafes">CAFÉS</a></li>
          </ul>
        </nav>
        <div className={styles.navbar__actions}>
          <div className={styles.hdhd}>
            <img src="/img/Language.svg" alt="Language" className='navbar__icon__language' />
          </div>
          <div className={styles.navbar__icon}>
            <img src="/img/search.svg" alt="Search" />
          </div>
          <div className={styles.navbar__hamburger} onClick={this.toggleSideSheet}>
            <button className={`${SECONDARY} ${CIRCLE}`} >
              <img src="/img/menu-burger.svg" alt="Menu" />
            </button>
          </div>
          {/* <div className={styles.navbar__profile}>

            <button className={`${SECONDARY} ${CIRCLE}`}>
              <img src="/img/profile.svg" alt="Profile" />
            </button>
          </div> */}
        </div>
        
        <div className={cx(styles.sideSheet, { [styles.open]: isSideSheetOpen })}>
          <div className={styles.sideSheet__close} onClick={this.toggleSideSheet}><button className={`${SECONDARY} ${CIRCLE}`}><img src="/img/close.svg" /></button></div>
          <ul className={styles.sideSheet__list}>
            <li className={styles.sideSheet__item}><a href="#">PLAY</a></li>
            <li className={styles.sideSheet__item}><a href="#">DISCOVER</a></li>
            <li className={styles.sideSheet__item}><a href="/blogs">BLOG</a></li>
            <li className={styles.sideSheet__item}><a href="/events">EVENTS</a></li>
            <li className={styles.sideSheet__item}><Link to="/cafes">CAFÉS</Link></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Navbar;
