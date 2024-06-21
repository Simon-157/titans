import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  CIRCLE,
  DISCORD,
  // FACEBOOK,
  FILLED,
  GOOGLE,
  TERTIARY,
  TWITCH,
} from 'defaults';
import SocialButton from './SocialButton';
import styles from './css/styles.css';

function renderButton({
  appId,
  birthDate,
  country,
  disabled,
  register,
  scope,
  type,
  socialFail,
  socialSuccess,
}) {
  return (
    <div className={cx(styles.button, type)}>
      <SocialButton
        appId={appId}
        birthDate={birthDate}
        className={cx(styles.socialBtn, styles[type], TERTIARY, CIRCLE, FILLED, type, `${type}Button`)}
        country={country}
        icon={type}
        provider={type}
        register={register}
        scope={scope}
        type={type}
        disabled={disabled}
        onLoginFailure={socialFail}
        onLoginSuccess={socialSuccess}
      />
    </div>
  );
}

function SocialButtons(props) {
  const {
    birthDate,
    country,
    disabled,
    discordText,
    googleText,
    register,
    socialFail,
    socialSuccess,
    onMouseEnter,
    t,
  } = props;

  return (
    <>

      <div className={styles.social} onMouseEnter={onMouseEnter}>

        {process.env.DISCORD_CLIENT_ID && (
          renderButton({
            appId: process.env.DISCORD_CLIENT_ID,
            birthDate,
            country,
            disabled,
            register,
            type: DISCORD,
            socialFail,
            socialSuccess,
            text: discordText,
            t,
          })
        )}

        {process.env.TWITCH_CLIENT_ID && (
          renderButton({
            appId: process.env.TWITCH_CLIENT_ID,
            disabled,
            register,
            type: TWITCH,
            socialFail,
            socialSuccess,
            t,
          })
        )}

        {process.env.GOOGLE_CLIENTID && (
          renderButton({
            appId: process.env.GOOGLE_CLIENTID,
            disabled,
            register,
            type: GOOGLE,
            scope: 'https://www.googleapis.com/auth/user.birthday.read',
            socialFail,
            socialSuccess,
            text: googleText,
            t,
          })
        )}

        {process.env.FACEBOOK_CLIENTID && (
          null
          // <div className={styles.button}>
          //   <SocialButton
          //     disabled={disabled}
          //     provider={FACEBOOK}
          //     appId={process.env.FACEBOOK_CLIENTID}
          //     onLoginSuccess={socialSuccess}
          //     onLoginFailure={socialFail}
          //     type={FACEBOOK}
          //   >
          //     <>
          //
          //       <span className={styles.with}>
          //         {t([(register ? REGISTER : LOGIN), WITH])}
          //         {' '}
          //       </span>
          //
          //       Facebook
          //
          //     </>
          //   </SocialButton>
          // </div>
        )}

      </div>

    </>
  );
}

SocialButtons.displayName = 'SocialButtons';

SocialButtons.propTypes = {
  birthDate: PropTypes.string,
  country: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.bool,
  discordText: PropTypes.string,
  googleText: PropTypes.string,
  socialFail: PropTypes.func,
  socialSuccess: PropTypes.func,
  onMouseEnter: PropTypes.func,
  t: PropTypes.func,
};

export default SocialButtons;
