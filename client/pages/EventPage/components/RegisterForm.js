import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/register_form.css';
import Modal from '../../../components/Modal';
import { CIRCLE, SECONDARY } from 'defaults';
import { Link } from 'react-router-dom';
import { PRIMARY, TERTIARY } from '../../../../defaults';
import ConfirmationModal from './ConfirmationModal';

export default class RegisterModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    email: '',
    dateOfBirth: '',
    country: '',
    city: '',
    password: '',
    confirmPassword: '',
    errors: {},
    isFormValid: false,
    isSubmitted: false,
    showConfirmationModal: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    }, this.validateForm);
  };

  validateForm = () => {
    const { username, email, dateOfBirth, country, city, password, confirmPassword } = this.state;
    const errors = {};

    if (!username) errors.username = 'Username is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!country) errors.country = 'Country is required';
    if (!city) errors.city = 'City is required';
    if (!password) errors.password = 'Password is required';
    if (!confirmPassword) errors.confirmPassword = 'Confirm password is required';
    else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

    this.setState({ errors }, this.checkFormValidity);
  };

  checkFormValidity = () => {
    const { errors } = this.state;
    const isFormValid = Object.keys(errors).length === 0;
    this.setState({ isFormValid });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true }, () => {
      this.validateForm();
      if (this.state.isFormValid) {
        // Submit form and show ConfirmationModal
        this.props.onClose();
        this.setState({ showConfirmationModal: true });
      }
    });
  };

  handleConfirmationClose = () => {
    this.setState({ showConfirmationModal: false });
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { errors, isFormValid, isSubmitted, showConfirmationModal } = this.state;

    if (!isOpen) {
      return null;
    }

    const eventDetails = {
      title: "Sample Event",
      date: "July 1, 2024",
      venue: "Sample Venue",
      qrCode: "Sample QR Code",
      giveaway: "Sample Giveaway",
    };

    return (
      <><Modal onClose={onClose} className={styles.modal} wrapClassName={styles.wrap}>
        <div className={styles.registerModal}>
          <div className={styles.closeButton}>
            <button className={`${SECONDARY} ${CIRCLE}`} onClick={onClose} style={{ width: '45px', height: '45px', textAlign: 'center', fontSize: '1.5em' }}>&times;</button>
          </div>
          <div className={styles.header}>
            <h2>Register</h2>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
          <div className={styles.icons}>
            <button className={`${PRIMARY} ${CIRCLE}`} style={{ width: '60px', height: '60px' }}><img src="/img/email.svg" alt="Email" style={{ width: '20px' }} /></button>
            <button className={`${SECONDARY} ${CIRCLE}`} style={{ width: '60px', height: '60px' }}><img src="/img/discord-icon.svg" alt="Discord" style={{ width: '20px' }} /></button>
            <button className={`${SECONDARY} ${CIRCLE}`} style={{ width: '60px', height: '60px' }}><img src="/img/google-icon.svg" alt="Google" /></button>
          </div>
          <section className={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              value={this.state.username}
              onChange={this.handleChange} />
            {isSubmitted && errors.username && <div className={styles.error}>{errors.username}</div>}
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={this.state.email}
              onChange={this.handleChange} />
            {isSubmitted && errors.email && <div className={styles.error}>{errors.email}</div>}
            <input
              type="date"
              name="dateOfBirth"
              placeholder="DATE OF BIRTH"
              value={this.state.dateOfBirth}
              onChange={this.handleChange} />
            {isSubmitted && errors.dateOfBirth && <div className={styles.error}>{errors.dateOfBirth}</div>}
            <select
              name="country"
              value={this.state.country}
              onChange={this.handleChange}
            >
              <option value="">COUNTRY</option>
              <option value="US">United States</option>
              <option value="IN">India</option>
              {/* TODO: more countries as needed */}
            </select>
            {isSubmitted && errors.country && <div className={styles.error}>{errors.country}</div>}
            <input
              type="text"
              name="city"
              placeholder="CITY"
              value={this.state.city}
              onChange={this.handleChange} />
            {isSubmitted && errors.city && <div className={styles.error}>{errors.city}</div>}
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={this.state.password}
              onChange={this.handleChange} />
            {isSubmitted && errors.password && <div className={styles.error}>{errors.password}</div>}
            <input
              type="password"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              value={this.state.confirmPassword}
              onChange={this.handleChange} />
            {isSubmitted && errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
          </section>
          <div className={styles.checkbox}>
            <div>
              <input type="checkbox" id="newsletter" />
            </div>
            <label htmlFor="newsletter">I agree to receive communications and newsletters.</label>
          </div>
          <div className={styles.terms}>
            By proceeding, you agree to our <a href="/terms">Terms of Service</a> and confirm you have read our <a href="/privacy">Privacy Policy</a>.
          </div>
          <button onClick={this.handleSubmit} className={isFormValid ? `${PRIMARY}` : `${TERTIARY}`} style={{ width: '100%', cursor: 'pointer', height: '45px', marginTop: '30px', marginBottom: '30px' }}>REGISTER</button>
        </div>

      </Modal><ConfirmationModal
          isOpen={showConfirmationModal}
          onClose={this.handleConfirmationClose}
          eventDetails={eventDetails} /></>
    );
  }
}
