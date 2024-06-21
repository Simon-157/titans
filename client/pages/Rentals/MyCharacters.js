import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import difference from 'lodash/difference';
import {
  emptyNullFunc,
  ALL,
  ALL_ELEMENTS,
  LISTED,
  CHARACTERS,
  ELEMENT,
  GLOBAL,
  HIGH,
  LEVEL,
  LOW,
  SECONDARY,
  STATUS,
  TERTIARY,
  CHARACTER,
  UNLISTED,
  RENTED,
  LOANED,
  MY_TITANS,
  OWNED_CHARACTERS,
} from 'defaults';
import { elements } from 'lib/element';
import { fakeCharacterIdLength } from 'lib/character';
import { withSub } from 'client/lib/sub';
import { executePrimusRequest } from 'client/request';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { getOwnedCharacters, getRentedCharacters } from 'reducers/character/selectors';
import { getCurrentUser } from 'reducers/user/selectors';
import { setCharacter as setCharacterAction } from 'reducers/character/actions';
// import MyCharactersData from './MyCharactersData';
import Character from './Character';
import ConfirmModal from './ConfirmModal';
import FiltersModal from './FiltersModal';
import styles from './css/styles.css';

class MyCharacters extends Component {
  static displayName = 'MyCharacters'

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

  FILTER_STATUSES = [LISTED, UNLISTED, RENTED, LOANED]

  LEVELS = [HIGH, LOW]

  state = {
    element: this.props.location?.state ? this.props.location.state.element : null,
    level: this.props.location?.state ? this.props.location.state.level : HIGH,
    status: this.props.location?.state ? this.props.location.state.status : null,
    isBulkEditOpened: false,
    isConfirmModalOpened: false,
    selectedCharacters: [],
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

    const { element, isBulkEditOpened, level, status } = state;

    let result = filter(characters, (c) => {
      const { _id } = c;

      return _id.length !== fakeCharacterIdLength;
    });

    if (isBulkEditOpened) {
      result = filter(result, this.isCharacterListedOrUnlisted);
    }

    if (element) {
      result = filter(result, (item) => {
        return item.element === element;
      });
    }

    if (status) {
      result = filter(result, (item) => {
        switch (status) {
          case LISTED:
            return !!item.maker && !item.taker;
          case UNLISTED:
            return !item.maker;
          case RENTED:
            return !!item.maker && !!item.taker && item.owner !== userId;
          default:
            return !!item.maker && !!item.taker && item.owner === userId;
        }
      });
    }

    result = result.sort((a, b) => {
      return level === LOW ? a.level - b.level : b.level - a.level;
    });

    this.characters = result;
  }

  isCharacterListedOrUnlisted(character) {
    return (character.maker && !character.taker) || !character.maker;
  }

  // setCharacters = (characters) => {
  //   this.setState({
  //     characters,
  //   });
  // }

  filter = (ev) => {
    const { value } = ev.currentTarget;

    this.setState({
      element: value,
    });
  }

  onCharacterCheckboxChange = (value, id) => {
    const { selectedCharacters } = this.state;
    const result = [...selectedCharacters];

    if (value) {
      result.push(id);
    } else {
      const index = result.indexOf(id);

      if (index > -1) {
        result.splice(index, 1);
      }
    }

    this.setState({
      selectedCharacters: result,
    });
  }

  renderCharacter = (character, key) => {
    const { location, user, setCharacter, t } = this.props;

    const { isBulkEditOpened, selectedCharacters } = this.state;

    const state = {
      ...this.state,
      prevPath: location.pathname,
      backButtonTitle: t([MY_TITANS]),
    };

    return (
      <Character
        key={key}
        character={character}
        user={user}
        checked={selectedCharacters.includes(character._id)}
        selectable={isBulkEditOpened}
        setCharacter={setCharacter}
        state={state}
        onCheckboxChange={this.onCharacterCheckboxChange}
        owned
        t={t}
      />
    );
  }

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

  onQuickListButtonClick = () => {
    this.setState({
      isBulkEditOpened: true,
    });

    this.selectAll();
  }

  cancelBulkEdit = () => {
    this.setState({
      isBulkEditOpened: false,
    });
  }

  selectAll = () => {
    const characters = filter(this.characters, this.isCharacterListedOrUnlisted);

    this.setState({
      selectedCharacters: characters.map((character) => character._id),
    });
  }

  unselectAll = () => {
    this.setState({
      selectedCharacters: [],
    });
  }

  approve = () => {
    const { selectedCharacters } = this.state;
    const unlistCharacters = difference(this.characters.map((character) => character._id), selectedCharacters);

    if (selectedCharacters.length) {
      executePrimusRequest('listForRental', CHARACTER, {
        characterId: selectedCharacters,
      }, this.cb);
    }

    if (unlistCharacters.length) {
      executePrimusRequest('unlistForRental', CHARACTER, {
        characterId: unlistCharacters,
      }, this.cb);
    }
  }

  cb = (err) => {
    if (err) {
      return;
    }

    this.cancelBulkEdit();
    this.toggleConfirmModal(false);
  }

  toggleConfirmModal = (isOpened = true) => {
    this.setState({
      isConfirmModalOpened: isOpened,
    });
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

  onConfirmFilters = (filters) => {
    this.setState(filters);
  }

  render() {
    const { t } = this.props;

    const {
      element,
      isBulkEditOpened,
      isConfirmModalOpened,
      level,
      selectedCharacters,
      status,
    } = this.state;

    const { characters } = this;

    return (
      <>

        {null
          // <MyCharactersData user={user} setCharacters={this.setCharacters} />
        }

        <div className={cx(styles.toolbar, styles.padding)}>

          {!isBulkEditOpened && (
            <div className={styles.quickListButtonBlock}>
              <button
                className={cx(TERTIARY, styles.quickListButton)}
                onClick={this.onQuickListButtonClick}
              >
                {t(['quickList'])}
              </button>
            </div>
          )}

          {!isBulkEditOpened && (
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
          )}

          {isBulkEditOpened && (
            <div className={styles.selectionButtons}>

              <button
                className={TERTIARY}
                onClick={this.selectAll}
              >
                {t(['listAll'])}
              </button>

              <button
                className={TERTIARY}
                onClick={this.unselectAll}
              >
                {t(['unlistAll'])}
              </button>

            </div>
          )}

        </div>

        <div className={styles.content}>
          {map(characters, this.renderCharacter)}
        </div>

        {isBulkEditOpened && (
          <div className={styles.footer}>

            <button
              className={TERTIARY}
              onClick={this.cancelBulkEdit}
            >
              {t(['cancel'])}
            </button>

            <button
              className={cx(TERTIARY, styles.approveButton)}
              onClick={this.toggleConfirmModal}
            >
              {t(['approve'])} ({selectedCharacters.length})
            </button>

          </div>
        )}

        {isConfirmModalOpened && (
          <Modal
            className={styles.confirmModal}
            isCloseButtonInsideContent
            wrapClassName={styles.confirmModalWrap}
            onClose={() => this.toggleConfirmModal(false)}
          >
            <ConfirmModal onConfirm={this.approve} t={t} />
          </Modal>
        )}
      </>
    );
  }
}

export default withSub(MyCharacters, function myCharactersSub({
  userId,
}) {
  const subs = [{
    name: GLOBAL,
  }];

  if (userId) {
    subs.push({
      name: CHARACTERS,
      props: {
        userId,
      },
    }, {
      name: OWNED_CHARACTERS,
      props: {
        userId,
      },
    });
  }

  return subs;
}, function mapStateToProps(state) {
  const user = getCurrentUser(state);
  const userId = user?.id;

  return {
    characters: [
      ...getOwnedCharacters(state, userId),
      ...getRentedCharacters(state, userId),
    ],
    user,
    userId,
  };
}, {
  setCharacter: setCharacterAction,
});
