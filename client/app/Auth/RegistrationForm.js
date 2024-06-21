import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form } from 'formsy-react';
import isFunction from 'lodash/isFunction';
import dayjs from 'dayjs';
import {
  emptyNullFunc,
  BIRTH_DATE,
  BUTTON,
  CIRCLE,
  COUNTRY,
  DISCORD,
  EMAIL,
  FILLED,
  GOOGLE,
  ID,
  NAME,
  PASSWORD,
  POST,
  PRIMARY,
  REGISTER,
  USERNAME,
  TERTIARY,
  ICON,
  WARNING,
  REQUIRED,
} from 'defaults';
import { handleError } from 'lib/error';
import { executeHttpRequest } from 'client/request';
import FormCheckbox from 'components/Form/Checkbox';
import FormInput from 'components/Form/Input';
import FormSelect from 'components/Form/Select';
import styles from './css/registrationForm.css';
import countries from '../../../lib/countries';
import Datepicker from '../../components/Form/Datepicker';

class RegistrationForm extends Component {
  static displayName = 'RegistrationForm'

  static propTypes = {
    addError: PropTypes.func,
    callback: PropTypes.func,
    openSocialRegistration: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
    toggleRegistration: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    error: null,
  }

  ref = (form) => {
    this.form = form;
  }

  register = () => {
    if (this.submitting) {
      return;
    }

    const payload = this.form.getModel();
    const {
      allowEmail,
      birthDate,
      country,
      email,
      password,
      privacyPolicy,
      username,
    } = payload;
    const requiredFields = [email, password, country, birthDate, privacyPolicy, username];

    if (requiredFields.some((field) => !field)) {
      return;
    }

    const { addError } = this.props;

    const emailRegexp = /\S+@\S+/g;

    if (!emailRegexp.test(email)) {
      addError('error.nonValidEmail');

      return;
    }

    this.submitting = true;

    executeHttpRequest(POST, REGISTER, {
      allowEmail,
      birthDate: this.getDate(birthDate),
      country,
      email,
      password,
      username,
    }, { skipError: true }, this.cb);
  }

  getDate(date) {
    const ONE_MINUTE = 60000;
    const tzoffset = (new Date()).getTimezoneOffset() * ONE_MINUTE;
    return (new Date(date - tzoffset)).toISOString().slice(0, 10);
  }

  cb = (err, data) => {
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

  render() {
    const { openSocialRegistration, t, toggleRegistration } = this.props;
    const { error } = this.state;
    const maxBirthDate = dayjs().subtract(16, 'year').toDate();

    return (
      <>
        <Form className={styles.form} ref={this.ref} onValidSubmit={this.register}>

          <div className={styles.title}>
            {t([REGISTER])}
          </div>

          <div className={styles.registrationText}>

            <span>
              {t(['alreadyHaveAccount'])}?&nbsp;
            </span>

            <span className={styles.registrationTextLink} onClick={toggleRegistration}>
              {t(['logIn'])}
            </span>

          </div>

          <div className={styles.socialButtons}>

            <button className={cx(TERTIARY, CIRCLE, FILLED)} type={BUTTON}>
              <img src={'/img/email.svg'} alt={EMAIL} />
            </button>

            <button
              className={cx(TERTIARY, CIRCLE, FILLED)}
              onClick={() => openSocialRegistration(DISCORD)}
            >
              <img src={'/img/discord-icon.svg'} alt={DISCORD} />
            </button>

            <button
              className={cx(TERTIARY, CIRCLE, FILLED)}
              onClick={() => openSocialRegistration(GOOGLE)}
            >

              <img src={'/img/google-icon.svg'} alt={GOOGLE} />

            </button>

          </div>

          <div className={styles.field}>

            <FormInput
              name={USERNAME}
              placeholder={t([USERNAME])}
              validations={REQUIRED}
              validationError={t(['usernameRequired'])}
            />

            <FormInput
              minLength={8}
              name={PASSWORD}
              placeholder={t([PASSWORD])}
              type={PASSWORD}
              validations={REQUIRED}
              validationError={t(['passwordRequired'])}
            />

          </div>

          <div className={styles.field}>

            <FormInput
              name={EMAIL}
              placeholder={t([EMAIL])}
              type={EMAIL}
              validations={REQUIRED}
              validationError={t(['emailRequired'])}
            />

            <Datepicker
              name={BIRTH_DATE}
              placeholderText={t([BIRTH_DATE])}
              validations={REQUIRED}
              validationError={t(['birthDateRequired'])}
              maxDate={maxBirthDate}
            />

          </div>

          <div className={cx(styles.field, COUNTRY)}>
            <FormSelect
              input
              name={COUNTRY}
              placeholder={COUNTRY}
              data={countries}
              valueKey={ID}
              labelKey={NAME}
              validations={REQUIRED}
              validationError={t(['countryRequired'])}
            />
          </div>

          <div className={styles.checkboxField}>
            <FormCheckbox
              name={'allowEmail'}
              label={t(['IAgreeReceiveNewsletter'])}
              defaultValue={false}
            />
          </div>

          <div className={styles.checkboxField}>
            <FormCheckbox
              name={'privacyPolicy'}
              label={t('IHaveReadAndAgreeWithTerms')}
              validations={REQUIRED}
              validationError={t(['privacyPolicyRequired'])}
            />
          </div>

          <div className={cx(styles.btns, styles.registerButton)}>

            <button className={PRIMARY} onClick={this.register}>
              {t([REGISTER])}
            </button>

            {error && (
              <div className={WARNING}>
                <img src={'/img/warning.svg'} alt={ICON} />
                { t(error) }
              </div>
            )}

          </div>

        </Form>
      </>
    );
  }
}

export default RegistrationForm;
