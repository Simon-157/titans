import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  emptyArr,
  emptyObj,
  emptyNullFunc,
  CONNECTED,
  NOT_CONNECTED,
  WALLET,
} from 'defaults';
import PluginWallets from './PluginWallets';
import UserWallets from './UserWallets';
import styles from './css/styles.css';

function Wallet(props) {
  const { user = emptyObj, onSign, t = emptyNullFunc } = props;

  const userWallets = get(user, [WALLET], emptyArr);

  const walletIsConnected = userWallets.length !== 0;

  return (
    <div className={styles.wallet}>

      <div className={styles.status}>

        <img
          src={walletIsConnected ?
            '/img/profile/wallet-status.svg' :
            '/img/profile/unlink.svg'
          }
          alt={WALLET}
        />

        <span className={styles.statusText}>

          <span>
            {t([WALLET])}
          </span>

          <span>
            &nbsp;
          </span>

          <span>
            {t([walletIsConnected ? CONNECTED : NOT_CONNECTED])}
          </span>

        </span>

      </div>

      {walletIsConnected && (
        <>

          <UserWallets user={user} userWallets={userWallets} t={t} />

          <hr className={styles.hr} />

        </>
      )}

      <PluginWallets userWallets={userWallets} onSign={onSign} />

    </div>
  );
}

Wallet.displayName = 'Wallet';

Wallet.propTypes = {
  user: PropTypes.object,
  onSign: PropTypes.func,
  t: PropTypes.func,
};

export default Wallet;
