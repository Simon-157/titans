import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Form } from 'formsy-react';
import {
  emptyObj,
  emptyFunc,
  emptyNullFunc,
  AUTH,
  NEW_PASSWORD,
  PASSWORD,
  POST,
  PRIMARY,
  RESET_PASSWORD,
  SAVE,
  STRING,
  hasLetter,
  hasNumber,
} from 'defaults';
import i18n from 'lib/i18n';
import { executeHttpRequest } from 'client/request';
import FormInput from 'components/Form/Input';
import {
  addError as addErrorAction,
  addSuccess as addSuccessAction,
} from 'reducers/global/actions';
import { setCurrentUser as setCurrentUserAction } from 'reducers/user/actions';
import styles from './css/styles.css';

let deflate = emptyFunc;

class ResetPassword extends Component {
  static displayName = 'ResetPassword'

  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    addError: PropTypes.func,
    addSuccess: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    match: emptyObj,
    t: emptyNullFunc,
  }

  constructor(props) {
    super(props);

    const { match: { params: { token } = emptyObj } } = props;

    this.token = token;

    if (deflate === emptyFunc) {
      import('pako').then((m) => {
        deflate = m.deflate;
      });
    }
  }

  submit = (data) => {
    if (this.submitting) {
      return;
    }

    const { addError, t } = this.props;

    const { password } = data;

    if (password.length < 8) {
      addError(t([AUTH, 'passwordLength']));

      return;
    }

    if (!hasNumber.test(password)) {
      addError(t([AUTH, 'invalidPasswordNumber']));

      return;
    }

    if (!hasLetter.test(password)) {
      addError(t([AUTH, 'invalidPasswordLetter']));

      return;
    }

    this.submitting = true;

    const { token } = this;

    const hashedPassword = deflate(password, { to: STRING });

    executeHttpRequest(POST, RESET_PASSWORD, {
      inflate: true,
      password: hashedPassword,
      token,
    }, this.cb);
  }

  cb = (err, data) => {
    this.submitting = false;

    if (err) {
      return;
    }

    const { history, setCurrentUser, addSuccess } = this.props;

    const { user } = data;

    addSuccess();
    setCurrentUser(user);
    history.replace('/');
  }

  render() {
    const { t } = this.props;

    return (
      <Form
        className={styles.reset}
        onValidSubmit={this.submit}
      >

        <div className={styles.title}>
          {t([AUTH, 'enterNewPassword'])}
        </div>

        <FormInput
          className={styles.pass}
          autoComplete={NEW_PASSWORD}
          name={PASSWORD}
          placeholder={t([PASSWORD])}
          type={PASSWORD}
          required
        />

        <button className={cx(PRIMARY, styles.submit)}>
          <span>
            {t([SAVE])}
          </span>
        </button>

      </Form>
    );
  }
}

export default connect(null, {
  addError: addErrorAction,
  addSuccess: addSuccessAction,
  setCurrentUser: setCurrentUserAction,
})(i18n(ResetPassword));
