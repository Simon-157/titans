import React from 'react';
import PropTypes from 'prop-types';
import {
  DISCORD,
  GOOGLE,
  ICON,
} from 'defaults';
import {
  DiscordLoginButton,
  // FacebookLoginButton,
} from 'react-social-login-buttons';
import SocialLogin from 'components/SocialLogin';
import GoogleLoginButton from 'components/SocialLogin/GoogleLoginButton';
// import TwitchButton from './TwitchButton';

const types = {
  [DISCORD]: DiscordLoginButton,
  // [FACEBOOK]: FacebookLoginButton,
  [GOOGLE]: GoogleLoginButton,
  // [TWITCH]: TwitchButton,
};

function SocialButton({ children, disabled, register, triggerLogin, type, text, ...rest }) {
  const Comp = types[type];

  if (!Comp) {
    return null;
  }

  return (
    <Comp
      iconSize={24}
      style={{
        height: 51,
        padding: '0 18px',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.1) 100%)',
        backdropFilter: 'blur(1px)',
        borderRadius: 50,
        border: '2px solid rgba(0, 255, 255, 0.35)',
        color: '#45E5E5',
        display: 'flex',
        fontWeight: 800,
        fontSize: 16,
        lineHeight: '110%',
        userSelect: 'none',
      }}
      activeStyle={{
        background: 'linear-gradient(180deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.1) 100%)',
        color: '#fff',
      }}
      register={register}
      onClick={disabled ? null : triggerLogin}
      {...(text ? { text } : {})}
      {...rest}
      type={register ? null : ICON}
    >
      {children}
    </Comp>
  );
}

SocialButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  register: PropTypes.bool,
  type: PropTypes.string,
  triggerLogin: PropTypes.func,
  text: PropTypes.string,
};

export default SocialLogin(SocialButton);
