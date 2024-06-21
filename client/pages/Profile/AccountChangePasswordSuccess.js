import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { emptyNullFunc, TERTIARY } from 'defaults';
import styles from './css/account.css';

class AccountChangePasswordSuccess extends Component {
  static displayName = 'AccountChangePasswordSuccess'

  static propTypes = {
    continueClick: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  render() {
    const { continueClick, t } = this.props;

    return (
      <div className={styles.changePasswordSuccessBlock}>

        <div className={styles.changePasswordSuccessTitle}>
          {t(['success'])}!
        </div>

        <div className={styles.changePasswordSuccessText}>
          {t(['yourPasswordChangedSuccessfully'])}
        </div>

        <button
          className={cx(TERTIARY, styles.continueButton)}
          onClick={continueClick}
        >
          {t(['continue'])}
        </button>

      </div>
    );
  }
}

export default AccountChangePasswordSuccess;
