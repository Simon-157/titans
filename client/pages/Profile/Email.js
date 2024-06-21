import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emptyObj, emptyNullFunc, EDIT_USER, POST } from 'defaults';
import { executeHttpRequest } from 'client/request';
import Switch from 'components/Switch';
import styles from './css/email.css';

class Email extends Component {
  static displayName = 'Email'

  static propTypes = {
    user: PropTypes.object,
    addSuccess: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  onChange = (name) => {
    if (this.submitting) {
      return;
    }

    this.submitting = true;

    const { user } = this.props;

    this.switcherName = name;

    executeHttpRequest(POST, EDIT_USER, {
      [this.switcherName]: !user[this.switcherName],
    }, this.cb);
  }

  cb = (err, user) => {
    this.submitting = false;

    if (err) {
      return;
    }

    const { addSuccess, setCurrentUser, t } = this.props;

    setCurrentUser({
      ...user,
      [this.switcherName]: !!user[this.switcherName],
    });

    addSuccess(t(['userDataSaved']));
  }

  render() {
    const { user, t } = this.props;

    const { allowEmail, allowPromo, email } = user || emptyObj;

    return (
      <div className={styles.emailBlock}>

        <div className={styles.title}>
          {t(['emailSettings'])}
        </div>

        <div className={styles.text}>

          <span>
            {t(['yourEmailsSentTo'])}&nbsp;
          </span>

          <a href={`mailto:${email}`} className={styles.emailLink}>
            {email}
          </a>

        </div>

        <div className={styles.switchers}>

          <div className={styles.switcher}>

            <Switch
              value={allowEmail}
              onChange={() => this.onChange('allowEmail')}
            />

            <div>

              <div className={styles.switcherLabelTitle}>
                {t(['gameNotifications'])}
              </div>

              <div className={styles.switcherLabelText}>
                {t(['gameNotificationDescriptions'])}
              </div>

            </div>

          </div>

          <div className={styles.switcher}>

            <Switch
              value={allowPromo}
              onChange={() => this.onChange('allowPromo')}
            />

            <div>

              <div className={styles.switcherLabelTitle}>
                {t(['marketingComm'])}
              </div>

              <div className={styles.switcherLabelText}>
                {t(['marketingCommDesc'])}
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default Email;
