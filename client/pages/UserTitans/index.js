import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import {
  emptyObj,
  title,
  ARROW,
  CHARACTERS,
  CONTAINER,
  PUBLIC_USER,
  TERTIARY,
} from 'defaults';
import i18n from 'lib/i18n';
import { fakeCharacterIdLength } from 'lib/character';
import { withSub } from 'client/lib/sub';
import { getUserCharacters } from 'reducers/character/selectors';
import { getUser } from 'reducers/user/selectors';
import Helmet from 'components/Helmet';
import Character from '../Rentals/Character';
import styles from './css/styles.css';

class UserTitans extends Component {
  static displayName = 'UserTitans'

  static propTypes = {
    characters: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
    t: PropTypes.func,
    user: PropTypes.object,
  }

  static defaultProps = {
    location: emptyObj,
  }

  constructor(props) {
    super(props);

    this.prepare();
  }

  shouldComponentUpdate(newProps) {
    const { characters } = newProps;

    const equals = isEqual(this.props.characters, characters);

    if (!equals) {
      this.prepare(newProps);
    }

    return !equals;
  }

  prepare(props = this.props) {
    const { characters } = props;

    let result = filter(characters, (titan) => {
      const { _id } = titan;

      return _id.length !== fakeCharacterIdLength
          && (this.isTitanListed(titan) || this.isTitanRented(titan));
    });

    result = result.sort((a) => a.taker ? 1 : -1);

    this.characters = result;
  }

  isTitanListed = (titan) => {
    return !!titan.maker && !titan.taker;
  }

  isTitanRented = (titan) => {
    const { user } = this.props;

    return !!titan.maker && !!titan.taker && titan.owner !== user.id;
  }

  renderCharacter = (character, key) => {
    const { user, t } = this.props;

    return (
      <Character
        key={key}
        character={character}
        user={user}
        t={t}
      />
    );
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { location, user, t } = this.props;

    const { characters } = this;

    const { profilePicture, username } = user || emptyObj;

    const { pathname } = location;

    const seoLink = `https://${process.env.HOSTNAME || 'reignoftitans.gg'}${pathname}`;

    const seoTitle = `${username}'s Titans - ${title}`;

    return (
      <div className={styles.userTitans}>

        <Helmet
          title={seoTitle}
          link={seoLink}
        />

        <div className={styles.header}>
          <button className={cx(TERTIARY, styles.backButton)} onClick={this.goBack}>

            <img src={'/img/faq/arrow-left.svg'} alt={ARROW} />

            {t(['back'])}

          </button>
        </div>

        <div className={CONTAINER}>

          <div className={styles.userInfo}>

            <div
              className={styles.userIcon}
              style={profilePicture ? {
                backgroundImage: `url("${profilePicture}")`,
              } : null}
            />

            <div className={styles.userName}>
              {username}
            </div>

          </div>

          <div className={styles.titans}>
            {map(characters, this.renderCharacter)}
          </div>

        </div>

      </div>
    );
  }
}

export default withSub(
  i18n(UserTitans),
  function myCharactersWithSub({ match }) {
    const subs = [];
    const userId = get(match, ['params', 'userId']);

    if (userId) {
      subs.push({
        name: CHARACTERS,
        props: {
          userId,
        },
      });

      subs.push({
        name: PUBLIC_USER,
        props: {
          userId,
        },
      });
    }

    return subs;
  },
  function mapStateToProps(state, { match }) {
    const userId = get(match, ['params', 'userId']);

    return {
      characters: getUserCharacters(state, userId),
      user: getUser(state, userId),
    };
  },
);
