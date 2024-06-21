import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  emptyObj,
  emptyNullFunc,
  OWNER,
  PUBLIC_USER,
  RENTEE,
  TITLE,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import RarityTag from 'components/RarityTag';
import WeaponTypeTag from 'components/WeaponTypeTag';
import { getUser } from 'reducers/user/selectors';
import { getWeapons } from 'reducers/weapon/selectors';
import { Link } from 'react-router-dom';
import styles from './css/styles.css';

class CharacterEquipedWeapons extends Component {
  static displayName = 'CharacterEquipedWeapons'

  static propTypes = {
    character:  PropTypes.object, // eslint-disable-line
    weapons: PropTypes.object, // eslint-disable-line
    characterOwner: PropTypes.object,
    characterTaker: PropTypes.object,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  constructor(props) {
    super(props);

    this.prepare();
  }

  characterWeaponsData = [];

  shouldComponentUpdate(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.prepare(nextProps);

      return true;
    }

    return false;
  }

  prepare(props = this.props) {
    const { character, weapons } = props;

    if (character?.weapons && weapons) {
      this.characterWeaponsData = character?.weapons.map((weaponId) => weapons[weaponId]);
    }
  }

  renderEquipedWeapon = (index) => {
    const { t } = this.props;

    const weapon = this.characterWeaponsData[index];

    let title;

    if (weapon?._id) {
      const arr = weapon._id.split('-');
      title = arr.slice(0, arr.length - 1).join('-');
    }

    return (
      <div
        key={index}
        className={cx(styles.block, {
          [styles.empty]: !weapon,
        })}
      >

        {weapon && (
          <>
            <div className={styles.weaponImage}>

              <div className={styles.itemGlow} />

              <div
                className={styles.weaponIcon}
                style={{ backgroundImage: `url("/img/weapons/${weapon._id}.svg")` }}
              />

            </div>

            <div>

              <div className={styles.blockTitle}>
                {t([TITLE, title])}
              </div>

              <div className={styles.tagsContainer}>

                <WeaponTypeTag type={weapon.type} t={t} />

                <RarityTag rarity={weapon.rarity} t={t} />

              </div>

            </div>
          </>

        )}
      </div>

    );
  }

  renderCharacterUser = (type) => {
    const { characterOwner, characterTaker, t } = this.props;

    const user = type === OWNER ? characterOwner : characterTaker;

    const smaller = characterOwner?._id && characterTaker?._id;

    const Element = type === OWNER ? Link : 'div';

    if (!user?._id) {
      return null;
    }

    const { _id, profilePicture, username } = user;

    return (
      <Element
        key={type}
        className={cx(styles.block, {
          [styles.smaller]: smaller,
        })}
        to={`/user-titans/${_id}`}
      >

        <div
          className={styles.userIcon}
          style={profilePicture ? {
            backgroundImage: `url("${profilePicture}")`,
          } : null}
        />

        <div className={styles.userInfo}>

          <div className={styles.userType}>
            {t([type])}
          </div>

          <div className={styles.blockTitle}>
            {username}
          </div>

        </div>

      </Element>
    );
  }

  render() {
    return (
      <div className={styles.container}>

        <div className={styles.userContainer}>
          {[OWNER, RENTEE].map(this.renderCharacterUser)}
        </div>

        {[0, 1].map(this.renderEquipedWeapon)}

      </div>
    );
  }
}

export default withSub(CharacterEquipedWeapons, function weaponsWithSub({
  character = emptyObj,
}) {
  const subs = [];

  const { userId, owner = userId, taker } = character;

  if (owner) {
    subs.push({
      name: PUBLIC_USER,
      props: {
        userId: owner,
      },
    });
  }

  if (taker) {
    subs.push({
      name: PUBLIC_USER,
      props: {
        userId: taker,
      },
    });
  }

  return subs;
}, function mapStateToProps(state, { character = emptyObj }) {
  const { userId, owner = userId, taker } = character;

  return {
    weapons: getWeapons(state),
    characterOwner: getUser(state, owner),
    characterTaker: getUser(state, taker),
  };
});
