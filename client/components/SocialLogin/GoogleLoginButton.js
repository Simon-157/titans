import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { decode } from 'jsonwebtoken';
import { GOOGLE, ICON } from 'defaults';
import styles from './css/styles.css';

let loaded;

class GoogleLoginButton extends Component {
  static displayName = 'GoogleLoginButton'

  static propTypes = {
    appId: PropTypes.string,
    birthDate: PropTypes.string,
    className: PropTypes.string,
    country: PropTypes.string,
    scope: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string,
    onClick: PropTypes.func,
    onLoginSuccess: PropTypes.func,
  }

  ref = (c) => {
    this.c = c;

    this.load();
  }

  shouldComponentUpdate() {
    return false;
  }

  load() {
    if (loaded) {
      this.onLoad();

      return;
    }

    const firstJS = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');

    js.src = 'https://accounts.google.com/gsi/client';
    js.id = 'gapi-client';

    js.onload = this.onLoad;

    if (!firstJS) {
      document.appendChild(js);
    } else {
      firstJS.parentNode.appendChild(js);
    }
  }

  onLoad = () => {
    const { appId, scope, type = ICON, onClick } = this.props;

    loaded = true;

    window?.google?.accounts?.id?.initialize({
      client_id: appId,
      fetchBasicProfile: true,
      scope: scope ? ((Array.isArray(scope) && scope.join(' ')) || scope) : null,
      callback: this.callback,
    });
    // window?.google?.accounts?.id?.prompt();
    window?.google?.accounts?.id?.renderButton(this.c, {
      shape: 'pill',
      size: 'large',
      text: 'continue_with',
      theme: 'filled_black',
      type,
      width: 250,
      click_listener: onClick,
    });
  }

  callback = ({ credential }) => {
    const { birthDate, country, onLoginSuccess } = this.props;

    const profile = decode(credential);

    onLoginSuccess({
      _profile: {
        id: profile.sub,
        birthDate,
        country,
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        name: profile.name,
        profilePicURL: profile.picture,
      },
      _provider: GOOGLE,
      _token: {
        accessToken: credential,
      },
    });
  }

  render() {
    const { className, style, type } = this.props;

    return (
      <div
        ref={this.ref}
        className={cx(className, styles.google, {
          [styles.icon]: type === ICON,
        })}
        style={style}
      />
    );
  }
}

export default GoogleLoginButton;
