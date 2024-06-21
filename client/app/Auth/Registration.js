import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { emptyNullFunc, CONTAINER } from 'defaults';
import RegistrationForm from './RegistrationForm';
import RegistrationSocialForm from './RegistrationSocialForm';
import styles from './css/registration.css';

class Registration extends Component {
  static displayName = 'Registration'

  static propTypes = {
    addError: PropTypes.func,
    callback: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    socialRegistrationType: false,
  }

  openSocialRegistration = (type) => {
    this.setState({
      socialRegistrationType: type,
    });
  }

  render() {
    const { socialRegistrationType } = this.state;

    const Comp = socialRegistrationType ? RegistrationSocialForm : RegistrationForm;

    return (
      <div className={cx(CONTAINER, styles.registration)}>
        <div className={styles.formContainer}>
          <Comp
            openSocialRegistration={this.openSocialRegistration}
            type={socialRegistrationType}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default Registration;
