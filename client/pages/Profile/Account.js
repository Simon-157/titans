import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emptyNullFunc } from 'defaults';
import AccountChangePassword from './AccountChangePassword';
import AccountChangePasswordSuccess from './AccountChangePasswordSuccess';
import AccountData from './AccountData';

class Account extends Component {
  static displayName = 'Account'

  static propTypes = {
    user: PropTypes.object,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    step: 1,
  }

  STEPS = {
    1: AccountData,
    2: AccountChangePassword,
    3: AccountChangePasswordSuccess,
  }

  setStep = (step) => {
    this.setState({
      step,
    });
  }

  render() {
    const { step } = this.state;

    const Comp = this.STEPS[step];

    return (
      <Comp
        changePasswordClick={() => this.setStep(2)}
        passwordSaved={() => this.setStep(3)}
        continueClick={() => this.setStep(1)}
        {...this.props}
      />
    );
  }
}

export default Account;
