import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentUser as setCurrentUserAction } from 'reducers/user/actions';
import {
  addError as addErrorAction,
  addSuccess as addSuccessAction,
} from 'reducers/global/actions';
import { withRouter } from 'react-router-dom';
import styles from './css/styles.css';
import Registration from './Registration';
import Login from './Login';

class Auth extends Component {
  static displayName = 'Auth'

  static propTypes = {
    addError: PropTypes.func,
    addSuccess: PropTypes.func,
    callback: PropTypes.func,
    isRegistrationOpen: PropTypes.bool,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  componentDidMount() {
    const { isRegistrationOpen } = this.props;

    this.setState({ isRegistrationOpen });
  }

  state = {
    isRegistrationOpen: false,
  }

  toggleRegistration = () => {
    const { isRegistrationOpen } = this.state;

    this.setState({
      isRegistrationOpen: !isRegistrationOpen,
    });
  }

  render() {
    const { isRegistrationOpen } = this.state;

    const Comp = isRegistrationOpen ?
      Registration :
      Login;

    return (
      <div className={styles.auth}>
        <Comp
          toggleRegistration={this.toggleRegistration}
          {...this.props}
        />
      </div>
    );
  }
}

export default connect(null, {
  addError: addErrorAction,
  addSuccess: addSuccessAction,
  setCurrentUser: setCurrentUserAction,
})(withRouter(Auth));
