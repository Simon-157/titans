import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import get from 'lodash/get';
import {
  emptyArr,
  emptyNullFunc,
  BUTTON,
  BLANK,
  CIRCLE,
  CLICK,
  DISCORD,
  FILLED,
  ID,
  LOGIN,
  LOGOUT,
  POST,
  PRIMARY,
  PROFILE_PICTURE,
  PUBLIC_USER,
  SECONDARY,
  TERTIARY,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { isInside, MOBILE_BREAKPOINT } from 'client/helpers';
import { executeHttpRequest } from 'client/request';
import Modal from 'components/Modal';
import { getCurrentUser, getUser } from 'reducers/user/selectors';
import { setCurrentUser as setCurrentUserAction } from 'reducers/user/actions';
import Auth from '../Auth';
import Menu from './Menu';
import styles from './css/styles.css';

class Header extends Component {
  static displayName = 'Header'

  static propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    showAuth: false,
    showLogin: false,
    showRegister: false,
  }

  componentWillReceiveProps() {
    this.state.showLogin = false;
    this.state.showRegister = false;
    this.state.showAuth = false;
  }

  toggleMenu = () => {
    const { showMenu } = this.state;

    this.setState({
      showMenu: !showMenu,
    });
  }

  toggleUserMenu = () => {
    const { showUserMenu } = this.state;
    const active = !showUserMenu;

    this.setState({
      showUserMenu: active,
    });

    if (active) {
      document.addEventListener(CLICK, this.clickout);
    } else {
      document.removeEventListener(CLICK, this.clickout);
    }
  }

  clickout = (ev) => {
    if (isInside(ev.target, [styles.userMenu])) {
      return;
    }

    this.toggleUserMenu();
  }

  logout = () => {
    executeHttpRequest(POST, LOGOUT, this.logoutCb);
  }

  logoutCb = () => {
    this.props.setCurrentUser();
  }

  toggleLogin = () => {
    const { showLogin } = this.state;

    this.setState({
      showLogin: !showLogin,
    });
  }

  toggleAuth = () => {
    const { showAuth } = this.state;

    this.setState({
      showAuth: !showAuth,
    });
  }

  toggleRegister = () => {
    const { showRegister } = this.state;

    this.setState({
      showRegister: !showRegister,
    });
  }

  render() {
    const { user, userId, t } = this.props;

    const {
      showAuth,
      showLogin,
      showRegister,
      showMenu,
      showUserMenu,
    } = this.state;

    const profilePicture = get(user, [PROFILE_PICTURE]);

    const isMobile = global.innerWidth <= MOBILE_BREAKPOINT;

    return (
      <div
        className={cx(styles.header, {
          [styles.menuOpened]: showMenu,
        })}
      >

        <div className={styles.leftHeaderBlock}>
          <a
            className={cx(BUTTON, TERTIARY, CIRCLE, FILLED, styles.discordButton)}
            href={'https://discord.gg/reignoftitans'}
            target={BLANK}
          >
            <img className={styles.discord} src={'/img/discord-icon.svg'} alt={DISCORD} />
          </a>
        </div>

        <div className={styles.rightHeaderBlock}>

          <button
            className={cx(styles.menuBurger, SECONDARY, CIRCLE)}
            onClick={this.toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>

          {!showMenu && userId && (
            <div className={styles.userMenuBlock}>

              <div className={styles.userIconBlock} onClick={this.toggleUserMenu}>
                <div
                  className={styles.userIcon}
                  style={profilePicture ? {
                    backgroundImage: `url("${profilePicture}")`,
                  } : null}
                />
              </div>

              <div className={cx(styles.userMenu, { [styles.opened]: showUserMenu })}>
                <div className={styles.userMenuContent}>

                  <div className={styles.userMenuitem}>
                    <Link to={'/profile'}>
                      {t(['profile'])}
                    </Link>
                  </div>

                  <div className={styles.userMenuitem}>
                    <span onClick={this.logout}>{t(['logOut'])}</span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {!showMenu && !userId && (
            <button
              className={cx(isMobile ? `${SECONDARY} ${CIRCLE}` : TERTIARY, FILLED)}
              onClick={this.toggleAuth}
            >
              {isMobile ? (
                <img className={styles.logIcon} src={'/img/profile.svg'} alt={LOGIN} />
              ) : t(['logIn'])}
            </button>
          )}

        </div>

        <Menu opened={showMenu} t={t} />

        {showAuth && (
          <Modal
            className={styles.authModal}
            wrapClassName={styles.loginWrapper}
            onClose={this.toggleAuth}
            isCloseButtonInsideContent
          >
            <div className={styles.authModalContent}>
              <div className={styles.authModalTitle}>
                {t(['getSetUpToPlay'])}
              </div>

              <div className={styles.authModalButtons}>

                <div className={styles.buttonBlock}>

                  <div className={styles.buttonBlockTitle}>
                    {t(['iHaveAccount'])}
                  </div>

                  <button
                    className={cx(TERTIARY, FILLED, styles.authLoginButton)}
                    onClick={this.toggleLogin}
                  >
                    {t(['logIn'])}
                  </button>

                </div>

                <div className={styles.buttonBlock}>

                  <div className={styles.buttonBlockTitle}>
                    {t(['iDontHaveAccount'])}
                  </div>

                  <button
                    className={cx(PRIMARY, styles.registerButton)}
                    onClick={this.toggleRegister}
                  >
                    {t(['makeOne'])}
                  </button>

                </div>

              </div>
            </div>
          </Modal>
        )}

        {showLogin && (
          <Modal
            className={styles.loginModal}
            wrapClassName={styles.loginWrapper}
            onClose={this.toggleLogin}
          >
            <Auth {...this.props} />
          </Modal>
        )}

        {showRegister && (
          <Modal
            className={styles.loginModal}
            wrapClassName={styles.loginWrapper}
            onClose={this.toggleRegister}
          >
            <Auth isRegistrationOpen {...this.props} />
          </Modal>
        )}

      </div>
    );
  }
}

export default withSub(Header, function headerSub({ userId }) {
  if (!userId) {
    return emptyArr;
  }

  return [{
    name: PUBLIC_USER,
    props: {
      userId,
    },
  }];
}, function mapStateToProps(state) {
  const user = getCurrentUser(state);

  const userId = get(user, [ID]);

  return {
    user: getUser(state, userId),
    userId,
  };
}, {
  setCurrentUser: setCurrentUserAction,
});
