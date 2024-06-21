import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import { parse } from 'qs';
import {
  CONTAINER,
  EDIT_USER,
  ERR,
  LOGIN,
  POST,
} from 'defaults';
import { handleError } from 'lib/error';
import { executeHttpRequest } from 'client/request';
import { addError as addErrorAction } from 'reducers/global/actions';
import { getCurrentUser } from 'reducers/user/selectors';
import { setCurrentUser as setCurrentUserAction } from 'reducers/user/actions';

class DiscordLoginCallback extends Component {
  static displayName = 'DiscordLoginCallback'

  static propTypes = {
    location: PropTypes.object, // eslint-disable-line
    user: PropTypes.object, // eslint-disable-line
    addError: PropTypes.func, // eslint-disable-line
    setCurrentUser: PropTypes.func,
  }

  state = {}

  constructor(props) {
    super(props);

    if (!global.__CLIENT__) {
      return;
    }

    const { user, addError, location } = props;

    const queryParams = parse(location.hash.slice(1), { ignoreQueryPrefix: true });

    const { access_token: accessToken, expires_in: expiresIn, state } = queryParams;

    const parsedState = state ? JSON.parse(atob(state)) : null;

    this.isConnection = parsedState?.isConnection;

    if (!this.isConnection && user) {
      window.close();

      return;
    }

    fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => result.json())
      .then((response) => {
        this.socialSuccess({
          ...response,
          ...parsedState,
          accessToken,
          expiresIn,
        });
      })
      .catch((err = null) => {
        this.setState({
          err: handleError(err),
        });

        addError(err);
      });
  }

  componentWillReceiveProps(newProps) {
    const { user } = newProps;

    if (!this.isConnection && user) {
      window.close();
    }
  }

  socialSuccess = (data) => {
    const { user } = this.props;

    const {
      id: accountId,
      accessToken,
      birthDate,
      country,
      discriminator,
      email,
      register,
      username,
    } = data;

    if (user) {
      executeHttpRequest(POST, EDIT_USER, {
        accessToken,
        discordId: accountId,
        discriminator,
        name: username,
      }, this.editCb);
    } else {
      executeHttpRequest(POST, LOGIN, {
        accessToken,
        accountId,
        birthDate,
        country,
        discriminator,
        email,
        provider: 'Discord',
        register,
        username,
      }, this.loginCb);
    }
  }

  editCb = (err, user) => {
    if (err) {
      this.setState({
        err: handleError(err),
      });

      return;
    }

    const { setCurrentUser } = this.props;

    setCurrentUser({
      id: user.id,
      discordId: user.discordId,
    });

    window.close();
  }

  loginCb = (err, data) => {
    if (err) {
      this.setState({
        err: handleError(err),
      });

      return;
    }

    const { setCurrentUser } = this.props;

    const { user } = data;

    setCurrentUser(user);
  }

  render() {
    const { err = null } = this.state;

    return (
      <div className={cx(CONTAINER, ERR)}>
        {err}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = getCurrentUser(state);

  return {
    user,
  };
}

export default connect(mapStateToProps, {
  addError: addErrorAction,
  setCurrentUser: setCurrentUserAction,
})(DiscordLoginCallback);
