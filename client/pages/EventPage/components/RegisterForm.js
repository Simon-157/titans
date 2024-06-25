import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../css/register_form.css'; 
import Modal from '../../../components/Modal';
import { CIRCLE, SECONDARY } from 'defaults';
import { Link } from 'react-router-dom';
import { PRIMARY, TERTIARY } from '../../../../defaults';


export default class RegisterModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const { isOpen, onClose } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <Modal onClose={onClose} className={styles.modal} wrapClassName={styles.wrap}>
        <div className={styles.registerModal}>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
          <div className={styles.header}>
            <h2>Register</h2>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
          <div className={styles.icons}>
            <button className={ `${PRIMARY} ${CIRCLE}`} style={{width: '60px', height: '60px'}}><img src="/img/email.svg" alt="Email" style={{width: '20px'}}/></button>
            <button className={ `${SECONDARY} ${CIRCLE}`} style={{width: '60px', height: '60px'}}><img src="/img/discord-icon.svg" alt="Discord" style={{width: '20px'}}/></button>
            <button className={ `${SECONDARY} ${CIRCLE}`}  style={{width: '60px', height: '60px'}}><img src="/img/google-icon.svg" alt="Google" /></button>
          </div>
          <form className={styles.form}>
            <input type="text" placeholder="USERNAME" required />
            <input type="email" placeholder="EMAIL" required />
            <input type="date" placeholder="DATE OF BIRTH" required />
            <select required>
              <option value="">COUNTRY</option>
              <option value="US">United States</option>
              <option value="IN">India</option>
              {/* Add more countries as needed */}
            </select>
            <input type="text" placeholder="CITY" required />
            <input type="password" placeholder="PASSWORD" required />
            <input type="password" placeholder="CONFIRM PASSWORD" required />
            <div className={styles.checkbox}>
              <input type="checkbox" id="newsletter" />
              <label htmlFor="newsletter">I agree to receive communications and newsletters.</label>
            </div>
            <div className={styles.terms}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                By proceeding, you agree to our <a href="/terms">Terms of Service</a> and confirm you have read our <a href="/privacy">Privacy Policy</a>.
              </label>
            </div>
            <button type="submit" className={styles.registerButton}>REGISTER</button>
          </form>
        </div>
      </Modal>
    );
  }
}