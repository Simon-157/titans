import React, { Component } from 'react';
import styles from '../css/styles.css';
import cx from 'classnames';
import { CIRCLE, SECONDARY } from '../../../../defaults';
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
      <><header className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <img src="/img/logo-bare.svg" alt="Logo" />
        </div>
        <nav className={styles.navbar__nav}>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}><a href="#">PLAY</a></li>
            <li className={styles.navbar__item}><Link to="/india">DISCOVER</Link></li>
            <li className={styles.navbar__item}><Link to="/events">EVENTS</Link></li>
            <li className={styles.navbar__item}><Link to="/cafes">CAFES</Link></li>
            <li className={styles.navbar__item}><Link to="/blogs">BLOGS</Link></li>
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
            <button className={`${SECONDARY} ${CIRCLE}`}>
              {isSideSheetOpen ? <img src="/img/close.svg" alt="Close" /> : <img src="/img/menu-burger.svg" alt="Menu" /> }
            </button>
          </div>
          <div className={styles.navbar__profile}>

            <button className={`${SECONDARY} ${CIRCLE}`}>
              <img src="/img/profile.svg" alt="Profile" />
            </button>
          </div>
        </div>

      </header>
        <section className={cx(styles.sideSheetWrapper, {[styles.open]: isSideSheetOpen })}>
          <div className={styles.sideSheet }>
            {/* <div className={styles.sideSheet__close} onClick={this.toggleSideSheet}><button className={`${SECONDARY} ${CIRCLE}`}><img src="/img/close.svg" /></button></div> */}
            <ul className={styles.sideSheet__list}>
              <li className={styles.sideSheet__item}><Link to="#">HOME</Link></li>
              <li className={styles.sideSheet__item}><Link to="#">PLAY</Link></li>
              <li className={styles.sideSheet__item}><Link to="/india">DISCOVER</Link></li>
              <li className={styles.sideSheet__item}><Link to="/events">EVENTS</Link></li>
              <li className={styles.sideSheet__item}><Link to="/cafes">CAFES</Link></li>
              <li className={styles.sideSheet__item}><Link to="/blogs">BLOGS</Link></li>
              <li className={styles.sideSheet__item}><Link to="/profile">PROFILE</Link></li>
              <li className={styles.sideSheet__item}><Link to="/logout">LOG OUT</Link></li>


            </ul>
          </div>

        </section></>
    );
  }
}

export default Navbar;
