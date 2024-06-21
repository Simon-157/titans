import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { USERNAME } from 'defaults';
import Wallet from 'app/Wallet';
import AccountAvatarBlock from './AccountAvatarBlock';
import styles from './css/account.css';

class AccountAvatar extends Component {
  static displayName = 'AccountAvatar'

  static propTypes = {
    user: PropTypes.object,
    onSign: PropTypes.func,
    t: PropTypes.func,
  }

  WALLETS = [
    { id: 1, name: 'wallet1', icon: '/img/discord-icon.svg' },
    { id: 2, name: 'wallet2', icon: '/img/discord-icon.svg' },
    { id: 3, name: 'Add new wallet' },
  ]

  render() {
    const { user, onSign, t } = this.props;

    return (
      <div className={styles.wrapperAvatarBlock}>

        <AccountAvatarBlock user={user} t={t} />

        <div className={styles.userInfo}>

          <div className={styles.login}>
            {get(user, [USERNAME])}
          </div>

          {!process.env.DISABLE_WALLET && (
            <Wallet user={user} onSign={onSign} t={t} />
          )}

        </div>

      </div>
    );
  }
}

export default AccountAvatar;
