import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form } from 'formsy-react';
import {
  emptyNullFunc,
  AUTH,
  EMAIL,
  ERROR,
  FORGOT_PASSWORD,
  GENERAL,
  POST,
  PRIMARY,
  SUBTITLE,
  TITLE,
  ICON,
  WARNING,
  REQUIRED,
} from 'defaults';
import { handleError } from 'lib/error';
import { executeHttpRequest } from 'client/request';
import FormInput from 'components/Form/Input';
import styles from './css/forgot.css';

class ForgotPassword extends Component {
  static displayName = 'ForgotPassword'

  static propTypes = {
    addError: PropTypes.func,
    addSuccess: PropTypes.func,
    close: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    error: null,
  }

  submit = (data) => {
    if (this.submitting) {
      return;
    }

    const { addError, t } = this.props;

    const { email } = data;

    if (!email) {
      addError(t([AUTH, 'invalidEmail']));

      return;
    }

    this.submitting = true;

    executeHttpRequest(POST, FORGOT_PASSWORD, { email }, { skipError: true }, this.cb);
  }

  cb = (err) => {
    this.submitting = false;

    if (err) {
      this.setState({ error: handleError(err) });

      return;
    }

    const { addSuccess, close, t } = this.props;

    addSuccess(t([GENERAL, ERROR, 'checkEmail']));

    close();
  }

  render() {
    const { t } = this.props;
    const { error } = this.state;

    return (
      <Form
        className={styles.reset}
        onValidSubmit={this.submit}
      >

        <div className={styles.title}>
          {t([AUTH, 'resetpassword', TITLE])}
        </div>

        <div className={styles.subtitle}>
          {t([AUTH, 'resetpassword', SUBTITLE])}
        </div>

        <FormInput
          className={styles.email}
          name={EMAIL}
          placeholder={t([EMAIL])}
          type={EMAIL}
          onChange={this.setEmail}
          validations={REQUIRED}
          validationError={t(['emailRequired'])}
        />

        <button className={cx(PRIMARY, styles.submit)}>
          <span>
            {t([AUTH, 'sendPasswordReset'])}
          </span>
        </button>

        {error && (
          <div className={WARNING}>
            <img src={'/img/warning.svg'} alt={ICON} />
            { t(error) }
          </div>
        )}

      </Form>
    );
  }
}

export default ForgotPassword;
