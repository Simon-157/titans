import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import {
  emptyObj,
  emptyNullFunc,
  DNA_SLOTS,
  FLEX,
  LEVEL_SLOTS,
  M,
  STARTER_SLOTS,
  WEAPON_SLOTS,
} from 'defaults';
import {
  DNA_SCROLLS_QUANTITY,
  STARTER_SCROLLS_QUANTITY,
  LEVEL_SCROLLS_QUANTITY,
  WEAPON_SCROLLS_QUANTITY,
} from 'lib/slot';
import Scroll from 'components/Scroll';
import { getActiveBalance } from 'reducers/balance/selectors';
import { getCharacter } from 'reducers/character/selectors';
import { getTranslation } from 'reducers/translation/selectors';
import styles from './css/styles.css';

class CharacterScrolls extends Component {
  static displayName = 'CharacterScrolls'

  static propTypes = {
    balance: PropTypes.object,
    characterId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // eslint-disable-line
    character: PropTypes.object, // eslint-disable-line
    slotsType: PropTypes.string, // eslint-disable-line
    t: PropTypes.func,
  }

  static defaultProps = {
    character: emptyObj,
    t: emptyNullFunc,
  }

  constructor(props) {
    super(props);

    this.prepare();
  }

  scrollsData = []

  componentWillReceiveProps(newProps) {
    const equals = isEqual(this.props, newProps);

    if (!equals) {
      this.prepare(newProps);
    }
  }

  prepare(props = this.props) {
    const { character, slotsType, balance } = props;

    if (!character?.scrolls || !balance) return;

    let scrollSlice = [];

    const replacableScrolls = character.scrolls.slice(DNA_SCROLLS_QUANTITY, -WEAPON_SCROLLS_QUANTITY);

    switch (slotsType) {
      case STARTER_SLOTS:
        scrollSlice = replacableScrolls.slice(0, STARTER_SCROLLS_QUANTITY);
        break;
      case LEVEL_SLOTS:
        scrollSlice = replacableScrolls.slice(STARTER_SCROLLS_QUANTITY, STARTER_SCROLLS_QUANTITY + LEVEL_SCROLLS_QUANTITY);
        break;
      case WEAPON_SLOTS:
        scrollSlice = character.scrolls.slice(-WEAPON_SCROLLS_QUANTITY);
        break;
      case DNA_SLOTS:
        scrollSlice = character.scrolls.slice(0, DNA_SCROLLS_QUANTITY);
        break;
      default:
        break;
    }

    this.scrollsData = scrollSlice.map((scroll) => balance.data.scrolls?.[scroll]);
  }

  renderScrolls = (scroll = emptyObj, key) => {
    const { balance, t } = this.props;

    const { _id = key } = scroll;

    return (
      <Scroll
        key={_id}
        balance={balance}
        scroll={scroll}
        size={M}
        t={t}
      />
    );
  }

  render() {
    return (
      <div className={cx(styles.container)}>
        <div className={cx(styles.mobileContainer, FLEX)}>
          {this.scrollsData.map(this.renderScrolls)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, { characterId }) {
  return {
    balance: getActiveBalance(state),
    character: getCharacter(state, characterId),
    translation: getTranslation(state),
  };
}

export default connect(mapStateToProps)(CharacterScrolls);
