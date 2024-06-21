import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import config from './config';
import sdk from './sdk';
import SocialUser from './SocialUser';
import cancelable from './cancelable';

const Social = (WrappedComponent) => {
  return class SocialLogin extends Component {
    static propTypes = {
      appId: PropTypes.string,
      autoLogin: PropTypes.bool,
      birthDate: PropTypes.string,
      country: PropTypes.string,
      isConnection: PropTypes.bool,
      gatekeeper: PropTypes.string,
      getInstance: PropTypes.func,
      onLoaded: PropTypes.func,
      onLoginFailure: PropTypes.func,
      onLoginSuccess: PropTypes.func,
      onLogoutFailure: PropTypes.func,
      onLogoutSuccess: PropTypes.func,
      onInternetFailure: PropTypes.func,
      provider: PropTypes.oneOf(config.providers),
      redirect: PropTypes.func,
      register: PropTypes.bool,
      // redirect: (props, propName, componentName) => {
      //   if (props.provider === 'instagram' && (!props[propName] || typeof props[propName] !== 'string')) {
      //     return new Error(`Missing required \`${propName}\` prop of type \`string\` on ${componentName}.`);
      //   }
      // },
      scope: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
      ]),
      version: PropTypes.string,
    }

    constructor(props) {
      super(props);

      this.isStateless = !WrappedComponent.prototype.render;

      this.state = {
        isLoaded: false,
        isConnected: false,
        isFetching: false,
      };

      // Load required SDK
      this.sdk = sdk[props.provider];
      this.accessToken = null;
      // this.fetchProvider = props.provider === 'instagram' || props.provider === 'github';
      this.loadPromise = Promise.resolve();
      this.node = null;
    }

    /**
    * Loads SDK on componentDidMount and handles auto login.
    */
    componentDidMount() {
      if (!this.sdk) {
        return;
      }

      const {
        appId,
        autoLogin,
        gatekeeper,
        redirect,
        scope,
        version,
      } = this.props;

      this.loadPromise = cancelable(this.sdk.load({
        appId,
        redirect,
        gatekeeper,
        scope,
        version,
      })
        .then((accessToken) => {
          if (accessToken) {
            this.accessToken = accessToken;
          }

          if (this.unmounted) {
            return null;
          }

          this.setState((prevState) => ({
            ...prevState,
            isLoaded: true,
          }), () => {
            if (typeof this.props.onLoaded === 'function') {
              this.props.onLoaded();
            }

            if (autoLogin || this.accessToken) {
              if (this.fetchProvider && !this.accessToken) {
                this.sdk.login({ state: this.getState() })
                  .catch(this.onLoginFailure);
              } else {
                this.sdk.checkLogin(true)
                  .then(this.onLoginSuccess, this.onLoginFailure);
              }
            }
          });

          return null;
        }, this.onLoginFailure));
    }

    // componentWillReceiveProps(nextProps) {
    //   const { appId, gatekeeper, provider } = this.props;
    //
    //   if (provider === 'github' && !gatekeeper && appId !== nextProps.appId) {
    //     this.setState(() => ({
    //       isLoaded: false,
    //       isFetching: false,
    //       isConnected: false,
    //     }), () => {
    //       this.sdk.load(nextProps.appId).then(() => {
    //         this.setState((prevState) => ({
    //           ...prevState,
    //           isLoaded: true,
    //         }));
    //       }, this.onLoginFailure);
    //     });
    //   }
    // }

    componentWillUnmount() {
      this.unmounted = true;
      const cancel = this.loadPromise?.cancel;
      if (isFunction(cancel)) {
        this.loadPromise.cancel();
      }
      this.node = null;
    }

    getState = () => {
      const {
        birthDate,
        country,
        isConnection,
        register,
      } = this.props;

      return btoa(JSON.stringify({
        birthDate,
        country,
        isConnection,
        register,
      }));
    }

    setInstance = (node) => {
      this.node = node;

      if (typeof this.props.getInstance === 'function') {
        this.props.getInstance(node);
      }
    }

    /**
    * Triggers login process.
    */
    login = () => {
      if (!navigator.onLine && this.props.onInternetFailure) {
        const shouldSkip = this.props.onInternetFailure();

        if (shouldSkip === false) {
          return;
        }
      }

      if (
        this.state.isLoaded &&
        !this.state.isFetching
      ) {
        this.setState((prevState) => ({
          ...prevState,
          isFetching: true,
        }), () => {
          this.sdk.login({ state: this.getState() }).then(this.onLoginSuccess, this.onLoginFailure)
            .catch(this.onLoginFailure);
        });
      } else if (this.state.isLoaded && this.state.isFetching) {
        this.onLoginFailure('Fetching user');
      } else if (!this.state.isLoaded) {
        this.onLoginFailure('SDK not loaded');
      } else {
        this.onLoginFailure('Unknown social login error');
      }
    }

    /**
    * Create SocialUser on login success and transmit it to onLoginSuccess prop.
    * @param {Object} response
    */
    onLoginSuccess = (response) => {
      const { onLoginSuccess, provider } = this.props;

      const user = new SocialUser(provider);

      const socialUserData = this.sdk.generateUser(response);

      user.profile = socialUserData.profile;
      user.token = socialUserData.token;

      this.setState({
        isFetching: false,
        isConnected: true,
      });

      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(user);
      }
    }

    /**
    * Handles login failure.
    * @param err
    */
    onLoginFailure = (err) => {
      const { onLoginFailure } = this.props;

      this.setState({
        isFetching: false,
        isConnected: false,
      });

      if (typeof onLoginFailure === 'function') {
        onLoginFailure(err);
      }
    }

    /**
    * Triggers logout process.
    */
    logout = () => {
      if (this.state.isLoaded && this.state.isConnected) {
        this.sdk.logout().then(this.onLogoutSuccess, this.onLogoutFailure);
      } else if (this.state.isLoaded && !this.state.isConnected) {
        this.props.onLoginFailure('User not connected');
      } else {
        this.props.onLoginFailure('SDK not loaded');
      }
    }

    /**
    * Handles logout success
    */
    onLogoutSuccess = () => {
      const { onLogoutSuccess } = this.props;

      if (this.node) {
        this.setState((prevState) => ({
          ...prevState,
          isConnected: false,
        }), () => {
          if (typeof onLogoutSuccess === 'function') {
            onLogoutSuccess();
          }
        });
      } else if (typeof onLogoutSuccess === 'function') {
        onLogoutSuccess();
      }
    }

    /**
    * Handles logout failure.
    * @param err
    */
    onLogoutFailure = (err) => {
      if (typeof this.props.onLoginFailure === 'function') {
        this.props.onLoginFailure(err);
      }
    }

    render() {
      // Don’t forward unneeded props
      const originalProps = omit(this.props, [
        'autoLogin',
        'gatekeeper',
        'getInstance',
        'onLogoutFailure',
        'onLogoutSuccess',
        'provider',
        'redirect',
        'onInternetFailure',
        'ref',
      ]);
      const { onLogoutFailure, onLogoutSuccess } = this.props;
      let additionnalProps = {};

      if (onLogoutFailure || onLogoutSuccess) {
        additionnalProps = {
          triggerLogout: this.logout,
        };
      }

      if (!this.isStateless) {
        additionnalProps = {
          ...additionnalProps,
          ref: this.setInstance,
        };
      }

      const { isLoaded } = this.state;

      return (
        <WrappedComponent
          triggerLogin={this.login}
          {...additionnalProps}
          {...originalProps}
          disabled={!isLoaded}
        />
      );
    }
  };
};

export default Social;
