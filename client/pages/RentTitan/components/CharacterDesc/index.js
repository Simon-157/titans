import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import {
  emptyObj,
  emptyNullFunc,
  AGILITY,
  ATTACK,
  DEFENSE,
  FLEX,
  HP,
  LISTED,
  LOANED,
  MAGICKA,
  MP,
  RENTED,
  UNLISTED,
} from 'defaults';
import { getHealth, getMana } from 'lib/character';
import { getActiveBalance } from 'reducers/balance/selectors';
import CharacterEquipedWeapons from '../CharacterEquipedWeapons';
import styles from './css/styles.css';

const characterFieldsRenderData = [{
  field: HP,
  label: HP,
  icon: '/img/poolTypesIcons/hp.svg',
}, {
  field: ATTACK,
  label: 'atk',
  icon: '/img/poolTypesIcons/attack.svg',
}, {
  field: DEFENSE,
  label: 'def',
  icon: '/img/poolTypesIcons/defense.svg',
}, {
  field: MP,
  label: MP,
  icon: '/img/poolTypesIcons/mana.svg',
}, {
  field: MAGICKA,
  label: 'mag',
  icon: '/img/poolTypesIcons/magicka.svg',
}, {
  field: AGILITY,
  label: 'agi',
  icon: '/img/poolTypesIcons/agility.svg',
}];

class CharacterDesc extends Component {
  static displayName = 'CharacterDesc'

  static propTypes = {
    balance: PropTypes.object,
    character: PropTypes.object,
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  static defaultProps = {
    character: emptyObj,
    t: emptyNullFunc,
  }

  renderCharacterProperty = ({ field, label, icon }) => {
    const {
      balance,
      character,
      t,
    } = this.props;

    let value;

    if (field === HP) {
      value = getHealth({ balance, character });
    } else if (field === MP) {
      value = getMana({ balance, character });
    } else {
      value = character[field];
    }

    return (
      <tr key={field}>

        <td
          className={styles.icon}
          style={{ backgroundImage: `url("${icon}")` }}
        />

        <td>
          {t([label])}
        </td>

        <td>
          {value}
        </td>

      </tr>
    );
  }

  render() {
    const {
      character,
      userId,
      t,
    } = this.props;

    const {
      _id,
      level,
      element,
      maker,
      name,
      owner,
      taker,
      v,
    } = character;

    let status;
    if (maker) {
      if (taker) {
        if (owner === userId) {
          status = LOANED;
        } else {
          status = RENTED;
        }
      } else {
        status = LISTED;
      }
    } else {
      status = UNLISTED;
    }

    return (
      <div>
        <div className={cx(styles.container, FLEX)}>

          <div className={styles.section}>
            <div
              className={styles.characterImage}
              style={_id ? {
                backgroundImage: `url("/api/charImage/${_id}/${_id}.png?v=${v}")`,
              } : null}
            />
          </div>

          <div className={styles.section}>

            <div className={styles.levelContainer}>

              {element && (
                <div
                  className={styles.element}
                  style={{ backgroundImage: `url("/img/characterElements/${element}.svg")` }}
                />
              )}

              <div className={styles.level}>
                {t(['lvl'])} {level}
              </div>

              {status && (
                <div className={cx(styles.availability, styles[status])}>
                  {t([status])}
                </div>
              )}

            </div>

            <div className={styles.characterName}>
              {name}
            </div>

            <div className={styles.statsContainer}>

              <table>
                <tbody>
                  {[
                    characterFieldsRenderData[0],
                    characterFieldsRenderData[1],
                    characterFieldsRenderData[2],
                  ].map(this.renderCharacterProperty)}
                </tbody>
              </table>

              <table>
                <tbody>
                  {[
                    characterFieldsRenderData[3],
                    characterFieldsRenderData[4],
                    characterFieldsRenderData[5],
                  ].map(this.renderCharacterProperty)}
                </tbody>
              </table>

            </div>

          </div>

        </div>

        {character && (
          <CharacterEquipedWeapons
            character={character}
            t={t}
          />
        )}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    balance: getActiveBalance(state),
  };
}

export default connect(mapStateToProps)(CharacterDesc);
