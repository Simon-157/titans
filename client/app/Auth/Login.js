import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form } from 'formsy-react';
import capitalize from 'lodash/capitalize';
import isFunction from 'lodash/isFunction';
import {
  emptyNullFunc,
  BUTTON,
  CIRCLE,
  CONTAINER,
  EMAIL,
  FILLED,
  FORGOT,
  LOAD,
  LOGIN,
  PASSWORD,
  POINTER,
  POST,
  PRIMARY,
  RECAPTCHA,
  REGISTER,
  SUBMIT,
  TERTIARY,
  ICON,
  WARNING,
  REQUIRED,
} from 'defaults';
import { handleError } from 'lib/error';
import { executeHttpRequest } from 'client/request';
import FormInput from 'components/Form/Input';
import ForgotPassword from './ForgotPassword';
import SocialButtons from './SocialButtons';
import styles from './css/login.css';

const loadedScript = false;

class Login extends Component {
  static displayName = 'Login'

  static propTypes = {
    addError: PropTypes.func,
    addSuccess: PropTypes.func,
    callback: PropTypes.func,
    toggleRegistration: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    error: null,
  }

  componentDidMount() {
    if (!process.env.G_CPTCH) {
      return;
    }

    if (loadedScript) {
      this.load(null, true);

      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.G_CPTCH}`;
    script.addEventListener(LOAD, this.load);

    document.body.appendChild(script);
  }

  load = (ev, instant) => {
    if (instant) {
      this.ready();

      return;
    }

    global.grecaptcha.ready(this.ready);
  }

  ready = async () => {
    if (!process.env.G_CPTCH) {
      return;
    }

    const recaptcha = await global.grecaptcha.execute(process.env.G_CPTCH, {
      action: LOGIN,
    });

    this.setState({
      recaptcha,
    });
  }

  login = (payload) => {
    const { recaptcha } = this.state;

    if (!recaptcha) {
      const { addSuccess } = this.props;

      addSuccess('Please wait a little');

      return;
    }

    if (this.submitting) {
      return;
    }

    this.submitting = true;

    executeHttpRequest(POST, LOGIN, {
      ...payload,
      recaptcha,
    }, { skipError: true }, this.cb);
  }

  socialFail = (err) => {
    const { addError } = this.props;

    addError(err);
  }

  socialSuccess = (user) => {
    const provider = capitalize(user._provider);

    const { accessToken } = user._token;

    const userProfile = user._profile;

    const {
      id: accountId,
      discriminator,
      email,
      name: username,
    } = userProfile;

    executeHttpRequest(POST, LOGIN, {
      accessToken,
      accountId,
      discriminator,
      email,
      provider,
      username,
    }, { skipError: true }, this.cb);
  }

  cb = (err, data) => {
    this.ready();

    this.submitting = false;

    if (err) {
      this.setState({ error: handleError(err) });

      return;
    }

    const { callback, setCurrentUser } = this.props;

    const { user } = data;

    setCurrentUser(user);

    if (isFunction(callback)) {
      callback(null, user);
    }
  }

  forgot = () => {
    this.setState({
      openForgotPassword: true,
    });
  }

  closeForgotPassword = () => {
    this.setState({
      openForgotPassword: false,
    });
  }

  renderForgotPassword() {
    const { addError, addSuccess, t } = this.props;

    return (
      <ForgotPassword
        addError={addError}
        addSuccess={addSuccess}
        close={this.closeForgotPassword}
        t={t}
      />
    );
  }

  renderContent() {
    const { toggleRegistration, t } = this.props;

    const { error, recaptcha } = this.state;

    return (
      <>

        <Form
          className={styles.form}
          onValidSubmit={this.login}
        >

          <div className={styles.title}>
            {t(['logIn'])}
          </div>

          <div className={styles.registrationText}>

            <span>
              {t(['dontHaveAccount'])}?&nbsp;
            </span>

            <span className={styles.registrationTextLink} onClick={toggleRegistration}>
              {t([REGISTER])}
            </span>

          </div>

          <div className={styles.socialButtons}>

            <button className={cx(TERTIARY, CIRCLE, FILLED)} type={BUTTON}>
              <img src={'/img/email.svg'} alt={EMAIL} />
            </button>

            <SocialButtons
              socialFail={this.socialFail}
              socialSuccess={this.socialSuccess}
              t={t}
            />

          </div>

          <div className={styles.loginBlock}>
            <FormInput
              name={LOGIN}
              placeholder={t(['username'])}
              validations={REQUIRED}
              validationError={t(['loginRequired'])}
            />
          </div>

          <div className={styles.password}>
            <FormInput
              name={PASSWORD}
              type={PASSWORD}
              placeholder={t(PASSWORD)}
              validations={REQUIRED}
              validationError={t(['passwordRequired'])}
            />
          </div>

          <div
            className={cx(styles.forgot, POINTER)}
            onClick={this.forgot}
          >
            {t([FORGOT])}
          </div>

          <div className={styles.btns}>

            {recaptcha ? (
              <button type={SUBMIT} className={PRIMARY}>
                {t([LOGIN])}
              </button>
            ) : (
              <img
                className={styles.recaptcha}
                src={'/img/preloader-dark.gif'}
                alt={RECAPTCHA}
              />
            )}

            {error && (
              <div className={WARNING}>
                <img src={'/img/warning.svg'} alt={ICON} />
                { error }
              </div>
            )}

          </div>

        </Form>

      </>
    );
  }

  render() {
    const { openForgotPassword } = this.state;

    let content;

    if (openForgotPassword) {
      content = this.renderForgotPassword();
    } else {
      content = this.renderContent();
    }

    return (
      <div className={cx(CONTAINER, styles.login)}>
        <div className={styles.formContainer}>
          {content}
        </div>
      </div>
    );
  }
}

export default Login;
