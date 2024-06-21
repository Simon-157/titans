import React from 'react';
import PropTypes from 'prop-types';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import bs58 from 'bs58';
import isFunction from 'lodash/isFunction';
import { SignedMessage } from 'lib/wallet';
import styles from './css/styles.css';

const alreadySigned = {};

function PluginWallets(props) {
  const { userWallets } = props;

  const wallet = useWallet();

  const { connected, publicKey } = wallet;

  if (connected && publicKey) {
    const { onSign } = props;

    if (isFunction(onSign)) {
      // eslint-disable-next-line no-inner-declarations
      async function createMessage() {
        const walletToken = publicKey.toString();

        if (userWallets.indexOf(walletToken) !== -1) {
          return;
        }

        if (alreadySigned[walletToken]) {
          return;
        }

        alreadySigned[walletToken] = true;

        const message = new SignedMessage({
          domain: window.location.host,
          publicKey: publicKey.toBase58(),
          statement: 'Sign this message to verify your wallet and attach it to your account',
          nonce: '. Reign of Titans',
        });

        const data = new TextEncoder().encode(message.prepare());
        const signature = await wallet.signMessage(data);
        const serializedSignature = bs58.encode(signature);

        onSign(null, {
          message,
          signature: serializedSignature,
        });
      }

      createMessage();
    }
  }

  return (
    <div className={styles.plugin}>
      <WalletMultiButton className={styles.plugin} />
    </div>
  );
}

PluginWallets.displayName = 'PluginWallets';

PluginWallets.propTypes = {
  userWallets: PropTypes.array,
  onSign: PropTypes.func,
};

export default PluginWallets;
