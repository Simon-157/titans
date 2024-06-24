import React, { Component } from 'react';
import styles from './css/styles.css';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footerNew}>
        <div className={styles.footerNew__links}>
          <a href="#"> . </a>
          <a href="/privacy">Privacy Policy</a>
          <a href="#"> . </a>
          <a href="/terms">Terms of Use</a>
          <a href="#"> . </a>
          <a href="/legal">Legal License</a>
          <a href="#"> . </a>
        </div>
        <div className={styles.footerNew__info}>
          <span>©2023</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
