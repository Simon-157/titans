import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import {
  BUTTON,
  CIRCLE,
  CLOSE,
  GET,
  SECONDARY,
  USER,
} from 'defaults';
import i18n from 'lib/i18n';
import { executeHttpRequest } from 'client/request';
import { getCurrentUser } from 'reducers/user/selectors';
import {
  addError as addErrorAction,
  addSuccess as addSuccessAction,
} from 'reducers/global/actions';
import { setCurrentUser as setCurrentUserAction } from 'reducers/user/actions';
import Account from './Account';
// import Discord from './Discord';
import Email from './Email';
import styles from './css/styles.css';
import AccountAvatar from './AccountAvatar';

class Profile extends Component {
  static displayName = 'Profile'

  static propTypes = {
    history: PropTypes.object,
    user: PropTypes.object,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  state = {
    selected: 1,
  }

  PAGES = {
    1: Account,
    // 2: Discord,
    2: Email,
  }

  constructor(props) {
    super(props);

    const { history, user } = props;

    if (user) {
      this.getUser();
    } else if (history) {
      history.replace('/');
    }
  }

  // Get user data as his role might have changed since jwt login
  getUser() {
    this.gettingUser = true;

    executeHttpRequest(GET, 'getUser', this.userCb);
  }

  userCb = (err, data) => {
    this.gettingUser = false;

    const user = get(data, [USER]);

    if (user) {
      this.props.setCurrentUser(user);
    }
  }

  selectItem = (selected) => {
    this.setState({
      selected,
    });
  }

  getMenu = () => {
    const { t } = this.props;

    const { selected } = this.state;

    const menu = [];

    const menuItems = [
      t(['account']),
      // t(['discord']),
      t(['emailSettings']),
    ];

    menuItems.forEach((item, index) => {
      menu.push(
        <div
          key={item}
          className={cx(styles.menuItem, {
            [styles.selected]: selected === index + 1,
          })}
          onClick={() => this.selectItem(index + 1)}
        >
          <span className={styles.menuItemName}>{item}</span>
        </div>,
      );
    });

    return menu;
  }

  render() {
    const { selected } = this.state;

    const menu = this.getMenu();

    const Comp = this.PAGES[selected];

    return (
      <div className={styles.profile}>
        <div className={styles.avatarBlock}>
          <AccountAvatar {...this.props} />
        </div>
        <div className={styles.contentBlock}>

          <div className={styles.menu}>
            {menu}
          </div>

          <div className={styles.content}>

            <Comp {...this.props} />

            <Link to={'/'} className={cx(BUTTON, SECONDARY, CIRCLE, styles.close)}>
              <img src={'/img/profile/close.svg'} alt={CLOSE} />
            </Link>

          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = getCurrentUser(state);

  return {
    user,
  };
}

export default connect(mapStateToProps, {
  addError: addErrorAction,
  addSuccess: addSuccessAction,
  setCurrentUser: setCurrentUserAction,
})(i18n(Profile));
