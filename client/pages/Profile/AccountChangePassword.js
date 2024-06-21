import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formsy-react';
import cx from 'classnames';
import {
  emptyNullFunc,
  CONFIRM_PASSWORD,
  EDIT_USER,
  NEWPASSWORD,
  PASSWORD,
  POST,
  TERTIARY,
} from 'defaults';
import { executeHttpRequest } from 'client/request';
import FormInput from 'components/Form/Input';
import styles from './css/account.css';

class AccountChangePassword extends Component {
  static displayName = 'AccountChangePassword'

  static propTypes = {
    addError: PropTypes.func,
    passwordSaved: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  save = (payload) => {
    if (this.submitting) {
      return;
    }

    const { t } = this.props;

    const {
      newPassword,
      confirmPassword,
    } = payload;

    const requiredFields = [newPassword, confirmPassword];

    if (requiredFields.some((field) => !field)) {
      return;
    }

    const { addError } = this.props;

    if (newPassword !== confirmPassword) {
      addError(t(['chooseSamePassword']));

      return;
    }

    this.submitting = true;

    executeHttpRequest(POST, EDIT_USER, {
      password: newPassword,
    }, this.cb);
  }

  ref = (form) => {
    this.form = form;
  }

  cb = (err, user) => {
    this.submitting = false;

    if (err) {
      return;
    }

    const { passwordSaved, setCurrentUser } = this.props;

    setCurrentUser(user);

    passwordSaved();
  }

  render() {
    const { t } = this.props;

    return (
      <div className={styles.changePasswordBlock}>

        <div className={styles.changePasswordTitle}>

          <div>
            {t(['choose'])}
          </div>

          <div>
            {t(['newPassword'])}
          </div>

        </div>

        <div>
          <Form ref={this.ref} onValidSubmit={this.save}>

            <FormInput
              type={PASSWORD}
              className={styles.newPasswordInput}
              name={NEWPASSWORD}
              placeholder={t([NEWPASSWORD])}
              required
            />

            <FormInput
              type={PASSWORD}
              className={styles.confirmPasswordInput}
              name={CONFIRM_PASSWORD}
              placeholder={t([CONFIRM_PASSWORD])}
              required
            />

            <button
              className={cx(TERTIARY, styles.confirmButton)}
              onClick={this.save}
            >
              {t(['confirm'])}
            </button>

          </Form>
        </div>

      </div>
    );
  }
}

export default AccountChangePassword;
