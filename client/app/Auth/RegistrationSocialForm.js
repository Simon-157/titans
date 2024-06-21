import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form } from 'formsy-react';
import capitalize from 'lodash/capitalize';
import isFunction from 'lodash/isFunction';
import {
  emptyNullFunc,
  BIRTH_DATE,
  COUNTRY,
  GOOGLE,
  ICON,
  ID,
  LOGIN,
  NAME,
  POST,
  PRIMARY,
  REGISTER,
  REQUIRED,
  WARNING,
} from 'defaults';
import countries from 'lib/countries';
import { handleError } from 'lib/error';
import { executeHttpRequest } from 'client/request';
import FormCheckbox from 'components/Form/Checkbox';
import Datepicker from 'components/Form/Datepicker';
import dayjs from 'dayjs';
import FormSelect from 'components/Form/Select';
// import GoogleLoginButton from 'components/SocialLogin/GoogleLoginButton';
import SocialButtons from './SocialButtons';
import styles from './css/registrationSocialForm.css';

class RegistrationSocialForm extends Component {
  static displayName = 'RegistrationSocialForm'

  static propTypes = {
    type: PropTypes.string,
    callback: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  state = {
    [BIRTH_DATE]: null,
    [COUNTRY]: null,
    error: null,
  }

  ref = (form) => {
    this.form = form;
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

    const payload = this.form.getModel();

    const {
      birthDate,
      country,
    } = payload;

    executeHttpRequest(POST, LOGIN, {
      accessToken,
      accountId,
      birthDate: this.getDate(birthDate),
      country,
      discriminator,
      email,
      provider,
      register: true,
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

  register = (payload) => {
    const { type } = this.props;

    const {
      birthDate,
      country,
      privacyPolicy,
    } = payload;

    const requiredFields = [country, birthDate, privacyPolicy];

    if (requiredFields.some((field) => !field)) {
      return;
    }

    document.querySelector(`.${type}Button`).click();
  }

  onBirthdayChange = (date) => {
    this.setState({
      [BIRTH_DATE]: this.getDate(date),
    });
  }

  onCountryChange = (country) => {
    this.setState({
      [COUNTRY]: country,
    });
  }

  onPrivacyChange = (value) => {
    this.setState({
      privacy: value,
    });
  }

  render() {
    const { type, t } = this.props;

    const {
      birthDate,
      country,
      error,
      privacy,
    } = this.state;

    const isGoogle = type === GOOGLE;
    const maxBirthDate = dayjs().subtract(16, 'year').toDate();

    return (
      <Form className={styles.form} ref={this.ref} onValidSubmit={this.register}>

        <div className={styles.title}>
          {t([REGISTER])}
        </div>

        <div className={styles.field}>
          <Datepicker
            name={BIRTH_DATE}
            placeholderText={t([BIRTH_DATE])}
            onChange={this.onBirthdayChange}
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
            onChange={this.onCountryChange}
            validations={REQUIRED}
            validationError={t(['countryRequired'])}
          />
        </div>

        <div className={cx(styles.checkboxField)}>
          <FormCheckbox
            name={'allowEmail'}
            label={t(['IAgreeReceiveNewsletter'])}
            defaultValue={false}
          />
        </div>

        <div className={cx(styles.checkboxField)}>
          <FormCheckbox
            name={'privacyPolicy'}
            label={t('IHaveReadAndAgreeWithTerms')}
            validations={REQUIRED}
            validationError={t(['privacyPolicyRequired'])}
            onChange={this.onPrivacyChange}
          />
        </div>

        {!isGoogle && (
          <div className={cx(styles.btns, styles.registerButton)}>
            <button className={PRIMARY}>
              {t([REGISTER])}
            </button>
          </div>
        )}

        <div
          className={cx(styles.socialButtons, {
            [styles.disabled]: !birthDate || !country || !privacy,
            [styles.isGoogle]: isGoogle,
          })}
        >
          <SocialButtons
            birthDate={birthDate}
            country={country}
            discordText={t(['registerWithDiscord'])}
            googleText={t(['registerWithGmail'])}
            register
            socialFail={this.socialFail}
            socialSuccess={this.socialSuccess}
            t={t}
          />
        </div>

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

export default RegistrationSocialForm;
