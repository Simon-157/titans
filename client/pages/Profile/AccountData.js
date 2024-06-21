import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form } from 'formsy-react';
import get from 'lodash/get';
import dayjs from 'dayjs';
import {
  emptyObj,
  emptyNullFunc,
  BIRTH_DATE,
  COUNTRY,
  EDIT_USER,
  EMAIL,
  ICON,
  ID,
  NAME,
  POST,
  TERTIARY,
  USERNAME,
  // WALLET,
} from 'defaults';
import countries from 'lib/countries';
import { executeHttpRequest } from 'client/request';
import Datepicker from 'components/Form/Datepicker';
import FormInput from 'components/Form/Input';
import FormSelect from 'components/Form/Select';
// import Select from 'components/Select';
import styles from './css/account.css';
import AccountAvatar from './AccountAvatar';

class Account extends Component {
  static displayName = 'Account'

  static propTypes = {
    user: PropTypes.object,
    addError: PropTypes.func,
    addSuccess: PropTypes.func,
    changePasswordClick: PropTypes.func,
    setCurrentUser: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    user: emptyObj,
    t: emptyNullFunc,
  }

  maxBirthDate = dayjs().subtract(16, 'year').toDate()

  ref = (form) => {
    this.form = form;
  }

  save = (payload) => {
    if (this.submitting) {
      return;
    }

    const {
      birthDate,
      country,
      email,
      username,
    } = payload;

    const requiredFields = [email, country, birthDate, username];

    if (requiredFields.some((field) => !field)) {
      return;
    }

    const { addError } = this.props;

    const emailRegexp = /\S@\S/g;

    if (!emailRegexp.test(email)) {
      addError('error.nonValidEmail');

      return;
    }

    this.submitting = true;

    executeHttpRequest(POST, EDIT_USER, {
      birthDate: this.getDate(birthDate),
      country,
      email,
      username,
    }, this.cb);
  }

  cb = (err, user) => {
    this.submitting = false;

    if (err) {
      return;
    }

    const { addSuccess, setCurrentUser, t } = this.props;

    setCurrentUser(user);

    addSuccess(t(['userDataSaved']));
  }

  getDate(date) {
    const ONE_MINUTE = 60000;

    const tzoffset = (new Date()).getTimezoneOffset() * ONE_MINUTE;

    return (new Date(date - tzoffset)).toISOString().slice(0, 10);
  }

  onSign = (err, { message, signature }) => {
    if (err) {
      const { addError } = this.props;

      addError(err);

      return;
    }

    this.submitting = true;

    const { publicKey } = message;

    executeHttpRequest(POST, EDIT_USER, {
      message,
      signature,
      wallet: publicKey,
    }, this.cb);
  }

  render() {
    const { changePasswordClick, user, t } = this.props;

    const { maxBirthDate } = this;

    const birthDay = get(user, [BIRTH_DATE]) ?
      new Date(user.birthDate) :
      null;

    const email = get(user, [EMAIL]);

    return (
      <>

        <div className={styles.contentLeftBlock}>
          <AccountAvatar {...this.props} onSign={this.onSign} />
        </div>

        <div className={styles.contentRightBlock}>
          <div className={styles.contentWrapper}>

            <Form ref={this.ref} onValidSubmit={this.save}>

              <FormInput
                label={t([USERNAME])}
                name={USERNAME}
                placeholder={t([USERNAME])}
                value={get(user, [USERNAME])}
                required
              />

              <Datepicker
                label={t([BIRTH_DATE])}
                name={BIRTH_DATE}
                placeholderText={t([BIRTH_DATE])}
                maxDate={maxBirthDate}
                value={birthDay}
                required
              />

              <div className={styles.countryBlock}>
                <FormSelect
                  resultLabel={t([COUNTRY])}
                  name={COUNTRY}
                  placeholder={t([COUNTRY])}
                  data={countries}
                  valueKey={ID}
                  labelKey={NAME}
                  value={get(user, [COUNTRY])}
                  required
                />
              </div>

              <FormInput
                label={t([EMAIL])}
                name={EMAIL}
                placeholder={t([EMAIL])}
                type={EMAIL}
                value={email}
                readOnly={Boolean(email)}
                required
              />

              <button className={cx(TERTIARY, styles.saveButton)} onClick={this.save}>
                <img src={'/img/profile/floppy.svg'} alt={ICON} />
                {t(['saveChanges'])}
              </button>

            </Form>

            <button
              className={cx(TERTIARY, styles.changePasswordButton)}
              onClick={changePasswordClick}
            >

              <img src={'/img/profile/lock.svg'} alt={ICON} />

              {t(['changePassword'])}

            </button>

            {/* <button className={TERTIARY}> */}

            {/*  <img src={'/img/profile/wastebasket.svg'} alt={ICON} /> */}

            {/*  {t(['deleteAccount'])} */}

            {/* </button> */}

          </div>
        </div>

      </>
    );
  }
}

export default Account;
