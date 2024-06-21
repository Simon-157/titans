import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BLANK, SUBMIT, TERTIARY } from 'defaults';
import { Link } from 'react-router-dom';
import styles from './css/confirmModal.css';

class ConfirmModal extends Component {
  static displayName = 'ConfirmModal'

  static propTypes = {
    onConfirm: PropTypes.func,
    t: PropTypes.func,
  }

  render() {
    const { onConfirm, t } = this.props;

    return (
      <div>

        <div className={styles.warning}>
          {t(['rentWarning'])}
        </div>

        <button
          className={cx(TERTIARY, styles.confirmButton)}
          type={SUBMIT}
          onClick={onConfirm}
        >
          {t(['confirmListing'])}
        </button>

        <div className={styles.rentSubject}>
          {t(['rentConfirmModalSubject'])}
        </div>

        <div className={styles.rentRewards}>
          {t(['rentConfirmModalRewards'])}
        </div>

        <div className={styles.termAndConditions}>

          {t(['byProceedingYouAgree'])}

          <Link to={'/documents/terms.pdf'} target={BLANK}>
            {t(['termsOfService'])}
          </Link>

          {t(['andConfirmYouHaveRead'])}

          <a href={'/documents/privacy.pdf'} target={BLANK}>
            {t(['privacyPolicy'])}
          </a>

        </div>

      </div>
    );
  }
}

export default ConfirmModal;
