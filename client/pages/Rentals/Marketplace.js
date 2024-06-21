import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import {
  emptyNullFunc,
  ALL,
  AVAILABLE,
  _ID,
  ALL_ELEMENTS,
  CHARACTERS_FOR_RENT,
  CIRCLE,
  ELEMENT,
  GLOBAL,
  ICON,
  NAME,
  SEARCH,
  SECONDARY,
  OWNER_NAME,
  TAKER_NAME,
  STATUS,
  LEVEL,
  HIGH,
  LOW,
  RENTED,
} from 'defaults';
import { elements } from 'lib/element';
import { findInObject } from 'lib/object';
import { withSub } from 'client/lib/sub';
import { MOBILE_BREAKPOINT } from 'client/helpers';
import Input from 'components/Input';
import Select from 'components/Select';
import { getCurrentUser } from 'reducers/user/selectors';
import { getCharactersForRent } from 'reducers/character/selectors';
import { setCharacter as setCharacterAction } from 'reducers/character/actions';
import Character from './Character';
// import MarketplaceData from './MarketplaceData';
import FiltersModal from './FiltersModal';
import styles from './css/styles.css';

class Marketplace extends Component {
  static displayName = 'Marketplace'

  static propTypes = {
    characters: PropTypes.array, // eslint-disable-line
    location: PropTypes.object,
    user: PropTypes.object,
    setCharacter: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  FILTER_STATUSES = [AVAILABLE, RENTED]

  LEVELS = [HIGH, LOW]

  state = {
    element: this.props.location?.state ? this.props.location.state.element : null,
    level: this.props.location?.state ? this.props.location.state.level : HIGH,
    status: this.props.location?.state ? this.props.location.state.status : AVAILABLE,
    search: this.props.location?.state ? this.props.location.state.search : '',
  }

  constructor(props) {
    super(props);

    const { t } = props;

    this.elements = reduce(elements, (result, element) => {
      result.push({
        _id: element,
        name: t([element]),
      });

      return result;
    }, [{
      _id: null,
      name: t([ALL_ELEMENTS]),
    }]);

    this.statuses = reduce(this.FILTER_STATUSES, (result, status) => {
      result.push({
        _id: status,
        name: t([status]),
      });

      return result;
    }, [{
      _id: null,
      name: t([ALL]),
    }]);

    this.levels = reduce(this.LEVELS, (result, level) => {
      result.push({
        _id: level,
        name: t([`${level}SortingLevel`]),
      });

      return result;
    }, []);

    this.prepare();
  }

  getFilters = () => {
    const { status, element, level } = this.state;

    return {
      status: {
        name: STATUS,
        list: this.statuses,
        value: status,
      },
      element: {
        name: ELEMENT,
        list: this.elements,
        value: element,
      },
      level: {
        name: LEVEL,
        list: this.levels,
        value: level,
      },
    };
  }

  shouldComponentUpdate(newProps, newState) {
    const { characters } = newProps;

    const equals = isEqual(this.props.characters, characters) &&
      isEqual(this.state, newState);

    if (!equals) {
      this.prepare(newProps, newState);
    }

    return !equals;
  }

  prepare(props = this.props, state = this.state) {
    const { characters, userId } = props;

    const { element, level, search, status } = state;

    let result = characters;

    if (element) {
      result = filter(result, (item) => {
        return item.element === element;
      });
    }

    if (status) {
      result = filter(result, (item) => {
        if (status === AVAILABLE) {
          return !!item.maker && !item.taker;
        }
        return !!item.maker && !!item.taker && item.owner !== userId;
      });
    }

    if (search) {
      result = filter(result, (item) => {
        return findInObject(item, search, [_ID, NAME, OWNER_NAME, TAKER_NAME]);
      });
    }

    result = result.sort((a, b) => {
      return level === LOW ? a.level - b.level : b.level - a.level;
    });

    this.characters = result;
  }

  // setCharacters = (characters) => {
  //   this.setState({
  //     characters,
  //   });
  // }

  setSorting = (key, ev) => {
    const { value } = ev.currentTarget;

    if (!value) {
      return;
    }

    this.setState({
      [key]: value,
    });
  }

  setFilter = (key, ev) => {
    const { value } = ev.currentTarget;

    this.setState({
      [key]: value,
    });
  }

  search = (search) => {
    this.setState({
      search,
    });
  }

  renderCharacter = (character, key) => {
    const { user, setCharacter, t } = this.props;

    return (
      <Character
        key={key}
        character={character}
        user={user}
        setCharacter={setCharacter}
        state={this.state}
        t={t}
      />
    );
  }

  onConfirmFilters = (filters) => {
    this.setState(filters);
  }

  render() {
    const { t } = this.props;

    const { element, level, search, status } = this.state;

    const { characters } = this;

    const width = global.__CLIENT__ ? window.innerWidth : 900;

    return (
      <>

        {null
          // <MarketplaceData setCharacters={this.setCharacters} />
        }

        <div className={cx(styles.toolbar, styles.padding)}>

          <div className={styles.searchBlock}>

            <Input
              name={SEARCH}
              className={styles.searchInput}
              placeholder={width > MOBILE_BREAKPOINT ? t(['searchTitans']) : t(['search'])}
              value={search}
              onChange={this.search}
            />

            <button className={cx(SECONDARY, CIRCLE, styles.searchButton)}>
              <img src={'/img/rentals/search.svg'} alt={ICON} />
            </button>

          </div>

          <div className={styles.filtersBlock}>

            <Select
              className={cx(styles.filterSelect, SECONDARY)}
              name={STATUS}
              data={this.statuses}
              value={status}
              onChange={(el) => this.setFilter(STATUS, el)}
            />

            <Select
              className={cx(styles.filterSelect, SECONDARY)}
              name={ELEMENT}
              data={this.elements}
              value={element}
              onChange={(el) => this.setFilter(ELEMENT, el)}
            />

            <Select
              className={cx(styles.filterSelect, SECONDARY)}
              name={LEVEL}
              data={this.levels}
              value={level}
              onChange={(el) => this.setSorting(LEVEL, el)}
            />

            <FiltersModal
              filters={this.getFilters()}
              onConfirm={this.onConfirmFilters}
              t={t}
            />

          </div>

        </div>

        <div className={styles.content}>
          {map(characters, this.renderCharacter)}
        </div>

      </>
    );
  }
}

export default withSub(Marketplace, [{
  name: CHARACTERS_FOR_RENT,
}, {
  name: GLOBAL,
}], function mapStateToProps(state) {
  const user = getCurrentUser(state);
  const userId = user?.id;

  return {
    characters: getCharactersForRent(state),
    user,
    userId,
  };
}, {
  setCharacter: setCharacterAction,
});
