import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
// import isFunction from 'lodash/isFunction';
import set from 'lodash/set';
import {
  emptyArr,
  emptyObj,
  emptyNullFunc,
  AVAILABLE,
  _ID,
  CHARACTER,
  ELEMENT,
  ID,
  LISTED,
  LOANED,
  RENTED,
  UNLISTED,
  USER_ID,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { getCharacter } from 'reducers/character/selectors';
import { getGlobal } from 'reducers/global/selectors';
// import CharacterData from './CharacterData';
import Checkbox from 'components/Checkbox';
import CharacterOwner from './CharacterOwner';
import CharacterTaker from './CharacterTaker';
import styles from './css/titan.css';

class Character extends Component {
  static displayName = 'Character'

  static propTypes = {
    character: PropTypes.object, // eslint-disable-line
    data: PropTypes.object,
    global: PropTypes.object,
    user: PropTypes.object,
    onCheckboxChange: PropTypes.func,
    owned: PropTypes.bool,
    checked: PropTypes.bool,
    selectable: PropTypes.bool,
    setCharacter: PropTypes.func, // eslint-disable-line
    state: PropTypes.object, // eslint-disable-line
    t: PropTypes.func,
  }

  static defaultProps = {
    character: emptyObj,
    data: emptyObj,
    t: emptyNullFunc,
  }

  constructor(props) {
    super(props);

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    this.prepare(newProps);
  }

  prepare(props = this.props) {
    const { character, data } = props;

    const { element, userId } = data;

    set(character, [ELEMENT], element);
    set(character, [USER_ID], userId);
  }

  // setCharacter = (payload) => {
  //   const { character, setCharacter } = this.props;
  //
  //   const { maker, mint, owner, taker } = character;
  //
  //   const { _id, name } = payload;
  //
  //   character._id = _id;
  //   character.name = name;
  //
  //   if (isFunction(setCharacter)) {
  //     setCharacter({
  //       ...payload,
  //       maker,
  //       mint,
  //       owner,
  //       taker,
  //     });
  //   }
  // }

  render() {
    const {
      data,
      global,
      state,
      user,
      onCheckboxChange,
      setCharacter,
      t,
      owned,
      checked,
      selectable,
    } = this.props;

    const {
      _id,
      element,
      image,
      level,
      maker,
      name,
      owner,
      rentedUntil,
      taker,
      v,
    } = data;

    const userId = get(user, [ID]);

    const Comp = selectable ? 'div' : Link;

    let status;
    if (maker) {
      if (taker) {
        // if (wallet.indexOf(maker) !== -1) {
        if (owner === userId) {
          status = LOANED;
        } else {
          status = RENTED;
        }
      } else {
        status = owned ? LISTED : AVAILABLE;
      }
    } else {
      status = UNLISTED;
    }

    return (
      <Comp to={{ pathname: `/rent-titan/${_id}`, state }}>

        {null
          // <CharacterData character={character} setCharacter={this.setCharacter} />
        }

        <div className={cx(styles.titan, status, { [styles.selectable]: selectable })}>

          <div className={styles.avatar}>

            {selectable && (
              <div
                className={styles.checkboxBlock}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  value={checked}
                  onChange={(value) => onCheckboxChange(value, _id)}
                />
              </div>
            )}

            <div className={styles.level}>
              {t(['lvl'])} {level}
            </div>

            <div className={styles.element}>
              {element && (
                <img
                  src={`/img/characterElements/${element}.svg`}
                  alt={ELEMENT}
                />
              )}
            </div>

            <div
              className={styles.character}
              style={{
                backgroundImage: `url('${image || `/api/charImage/${_id}/${_id}.png?v=${v}`}')`,
              }}
            />

          </div>

          <div className={styles.description}>

            {status && (
              <div className={cx(styles.status, status)}>
                {t([status])}
              </div>
            )}

            <div className={styles.name}>
              {name}
            </div>

            <CharacterOwner
              character={data}
              t={t}
              setCharacter={setCharacter}
            />

            <CharacterTaker
              character={data}
              t={t}
              setCharacter={setCharacter}
            />

            {taker && rentedUntil ? (
              <div className={styles.rented}>
                {t(['rentedUntil'])}:<br /> {rentedUntil.format('DD/MM/YYYY')}
              </div>
            ) : [AVAILABLE, LISTED].includes(status) && (
              <div className={styles.rented}>
                {t(['rentUntil'])}: {global.rentedUntil?.format('DD/MM/YYYY')}
              </div>
            )}

          </div>

        </div>
      </Comp>
    );
  }
}

export default withSub(Character, function characterWithSub({ character }) {
  const characterId = get(character, [_ID]);

  if (characterId) {
    return [{
      name: CHARACTER,
      props: {
        characterId,
      },
    }];
  }

  return emptyArr;
}, function mapStateToProps(state, { character = emptyObj }) {
  return {
    data: getCharacter(state, character._id),
    global: getGlobal(state),
  };
});
