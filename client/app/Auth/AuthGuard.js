import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { ID } from 'defaults';
import Modal from 'components/Modal';
import { getCurrentUser } from 'reducers/user/selectors';
import Auth from './index';
import styles from './css/authGuard.css';

class AuthGuard extends Component {
  static displayName = 'AuthGuard'

  static propTypes = {
    elements: PropTypes.array,
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  state = {
    showLogin: false,
  }

  componentDidMount() {
    const { elements } = this.props;

    elements.forEach((el) => {
      el.addEventListener('click', this.onElementClick);
    });
  }

  componentWillUnmount() {
    const { elements } = this.props;

    elements.forEach((el) => {
      el.removeEventListener('click', this.onElementClick);
    });
  }

  componentWillReceiveProps() {
    this.state.showLogin = false;
  }

  toggleLogin = () => {
    const { showLogin } = this.state;

    this.setState({
      showLogin: !showLogin,
    });
  }

  onElementClick = (e) => {
    const { userId } = this.props;

    if (!userId) {
      e.preventDefault();
      this.toggleLogin();
    }
  }

  render() {
    const { showLogin } = this.state;

    if (!showLogin) {
      return null;
    }

    const { t } = this.props;

    return (
      <Modal
        className={styles.loginModal}
        wrapClassName={styles.loginWrapper}
        onClose={this.toggleLogin}
      >
        <Auth t={t} />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const user = getCurrentUser(state);

  const userId = get(user, [ID]);

  return {
    userId,
  };
}

export default connect(mapStateToProps)(AuthGuard);
