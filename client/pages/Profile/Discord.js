import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import pick from 'lodash/pick';
import get from 'lodash/get';
import {
  emptyArr,
  emptyObj,
  emptyNullFunc,
  DISCORD,
  EDIT_USER,
  ID,
  LOOTBOX,
  LOOTBOXES,
  MEDIUM,
  MEGA,
  NORMAL,
  POST,
  PROFILE_PICTURE,
  USER_ACCOUNTS,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { executeHttpRequest } from 'client/request';
import { getUserLootbox } from 'reducers/lootbox/selectors';
import { getUser } from 'reducers/user/selectors';
import SocialButton from 'app/Auth/SocialButton';
import styles from './css/discord.css';

class Discord extends Component {
  static displayName = 'Discord'

  static propTypes = {
    addError: PropTypes.func,
    lootbox: PropTypes.object,
    setCurrentUser: PropTypes.func,
    user: PropTypes.object,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  socialFail = (err) => {
    const { addError } = this.props;

    addError(err);
  }

  socialSuccess = (data) => {
    executeHttpRequest(POST, EDIT_USER, {
      accessToken: data.token.accessToken,
      discordId: data.profile.id,
      discriminator: data.profile.discriminator,
      name: data.profile.name,
    }, this.cb);
  }

  cb = (err, user) => {
    const { setCurrentUser } = this.props;

    setCurrentUser({
      id: user.id,
      discordId: user.discordId,
    });
  }

  renderLootbox = (value, key) => {
    return (
      <div className={styles.lootbox} key={key}>

        <img src={`/img/lootbox/${key}.png`} alt={LOOTBOX} />

        <div className={styles.counter}>
          {value}
        </div>

      </div>
    );
  }

  render() {
    const { lootbox, t, user } = this.props;

    const profilePicture = get(user, [PROFILE_PICTURE]) || '/img/user-icon.png';

    return (
      <div className={styles.discord}>

        {!user.discordId && (
          <div className={styles.placeholder}>
            <div className={styles.placeholderText}>
              {process.env.DISCORD_CLIENT_ID && (
                <SocialButton
                  appId={process.env.DISCORD_CLIENT_ID}
                  className={styles.connectDiscordButton}
                  icon={DISCORD}
                  isConnection
                  text={t(['connectDiscord'])}
                  type={DISCORD}
                  provider={DISCORD}
                  onLoginFailure={this.socialFail}
                  onLoginSuccess={this.socialSuccess}
                  t={t}
                />
              )}
            </div>
          </div>
        )}

        {user.discordId && (
          <>

            <div className={styles.userInfo}>

              <div
                className={styles.avatar}
                style={{
                  backgroundImage: `url('${profilePicture}')`,
                }}
              />

              <div className={styles.discordId}>

                <div className={styles.discordIdCaption}>
                  {t(['discordId'])}
                </div>

                <div className={styles.discordIdNumber}>
                  {user.discord}
                </div>

              </div>

            </div>

            <div className={styles.lootboxes}>

              {lootbox && map(pick(lootbox, [NORMAL, MEDIUM, MEGA]), this.renderLootbox)}

              {!lootbox && map({ [NORMAL]: 0, [MEDIUM]: 0, [MEGA]: 0 }, this.renderLootbox)}

            </div>
          </>
        )}

      </div>
    );
  }
}
export default withSub(Discord, function subscriptions({ user }) {
  const { id: userId } = user || emptyObj;

  if (userId) {
    return [{
      name: LOOTBOXES,
      props: {
        userId,
      },
    }, {
      name: USER_ACCOUNTS,
      props: {
        userId,
      },
    }];
  }

  return emptyArr;
}, function mapStateToProps(state, { user }) {
  const userId = get(user, [ID]);

  return {
    lootbox: getUserLootbox(state, userId),
    user: getUser(state, userId),
  };
});
