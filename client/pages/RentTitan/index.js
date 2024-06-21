import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import {
  title,
  ACCEPT,
  ACTIVE_BALANCE,
  CHARACTER,
  DECLINE,
  DNA_SLOTS,
  ID,
  LEVEL_SLOTS,
  LIST,
  MARKETPLACE,
  NAV,
  PUBLIC_USER,
  RENT,
  RENTAL_REQUESTS,
  STARTER_SLOTS,
  TERTIARY,
  UNLIST,
  UNRENT,
  WEAPON_SLOTS,
  WEAPONS,
} from 'defaults';
import i18n from 'lib/i18n';
import { withSub } from 'client/lib/sub';
import { executePrimusRequest } from 'client/request';
import NotFound from 'pages/NotFound';
import Helmet from 'components/Helmet';
import Modal from 'components/Modal';
import Tabs from 'components/Tabs';
import { getCurrentUser, getUser } from 'reducers/user/selectors';
import { getCharacter } from 'reducers/character/selectors';
import { getRequestByCharacterAndTakerId } from 'reducers/rentalRequest/selectors';
import { addSuccess as addSuccessAction } from 'reducers/global/actions';
import CharacterDesc from './components/CharacterDesc';
import CharacterScrolls from './components/CharacterScrolls';
import ConfirmModal from './components/ConfirmModal';
import styles from './css/styles.css';

class RentTitan extends Component {
  static displayName = 'RentTitan'

  static propTypes = {
    history: PropTypes.object,
    incomingRequest: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object, // eslint-disable-line
    character: PropTypes.object,
    requester: PropTypes.object,
    userId: PropTypes.string, // eslint-disable-line
    addSuccess: PropTypes.func,
    t: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      showConfirmModal: false,
    };
  }

  toggleConfirmModal = () => {
    this.setState({
      showConfirmModal: !this.state.showConfirmModal,
    });
  }

  goBack = () => {
    const { location: { state } } = this.props;
    const { prevPath } = { ...state };

    this.props.history.push(prevPath || '/rent-titan', state);
  };

  renderTabContent = (tab) => {
    const { character, t } = this.props;

    return (
      <CharacterScrolls
        characterId={character._id}
        slotsType={tab}
        t={t}
      />
    );
  }

  getBackButtonTitle = () => {
    const { t } = this.props;

    const { backButtonTitle } = this.props.location?.state || {};

    return backButtonTitle || t([MARKETPLACE]);
  }

  accept = () => {
    const { incomingRequest } = this.props;

    const { _id, characterId } = incomingRequest;

    executePrimusRequest(ACCEPT, CHARACTER, { characterId, requestId: _id }, this.cb);
  }

  decline = () => {
    const { incomingRequest } = this.props;

    const { _id, characterId } = incomingRequest;

    executePrimusRequest(DECLINE, CHARACTER, { characterId, requestId: _id }, this.cb);
  }

  render() {
    const {
      character,
      location,
      userId,
      addSuccess,
      requester,
      t,
    } = this.props;

    const {
      _id,
      element,
      level,
      maker,
      name,
      taker,
      rentedUntil,
      v,
    } = character;

    if (!_id) {
      return <NotFound />;
    }

    const { incoming } = location?.state || {};

    const {
      profilePicture: requesterProfilePicture,
      username: requesterUsername,
    } = requester || {};

    const { showConfirmModal } = this.state;

    const backButtonTitle = this.getBackButtonTitle();

    let { owner } = character;
    if (!owner) {
      owner = character.userId;
    }

    const showList = userId === owner && !taker;

    const showUnlist = showList && maker === userId;

    const showRent = !showList && maker && maker !== userId && !taker;

    const showUnrent = taker === userId;

    const { pathname } = location;

    const seoLink = `https://${process.env.HOSTNAME || 'reignoftitans.gg'}${pathname}`;

    const seoTitle = `Rent ${_id} - ${title}`;

    return (
      <>

        <Helmet
          title={seoTitle}
          link={seoLink}
        />

        <div
          className={cx(styles.container, {
            [styles.blured]: showConfirmModal,
          })}
        >

          <div className={styles.contentWrapper}>

            <div
              className={styles.backContainer}
              onClick={this.goBack}
            >

              <img src={'/img/backArrow.svg'} alt={'back'} />

              <span>
                {backButtonTitle}
              </span>

            </div>

            <div className={styles.characterDescWrapper}>
              <CharacterDesc
                character={character}
                userId={userId}
                t={t}
              />
            </div>

            <Tabs
              className={styles.rentTitanDetailsTabs}
              tabs={[{
                label: t([DNA_SLOTS]),
                content: this.renderTabContent(DNA_SLOTS),
              }, {
                label: t([STARTER_SLOTS]),
                content: this.renderTabContent(STARTER_SLOTS),
              }, {
                label: t([LEVEL_SLOTS]),
                content: this.renderTabContent(LEVEL_SLOTS),
              }, {
                label: t([WEAPON_SLOTS]),
                content: this.renderTabContent(WEAPON_SLOTS),
              }]}
            />

          </div>

          {incoming && requester && (
            <div className={cx(styles.footer, styles.requestFooter)}>
              <div className={styles.footerContentWrapper}>
                <div className={styles.request}>

                  <div className={styles.requesterInfo}>

                    <div
                      className={styles.requesterIcon}
                      style={requesterProfilePicture ? {
                        backgroundImage: `url("${requesterProfilePicture}")`,
                      } : null}
                    />

                    <div>

                      <div className={styles.requestedBy}>
                        {t(['requestedBy'])}
                      </div>

                      <div className={styles.requesterUserName}>
                        {requesterUsername}
                      </div>

                    </div>

                  </div>

                  <div className={styles.requesterButtons}>

                    <button
                      className={cx(TERTIARY, styles.requestButton)}
                      onClick={this.accept}
                    >
                      {t([ACCEPT])}
                    </button>

                    <button
                      className={cx(TERTIARY, styles.borderNone, styles.requestButton)}
                      onClick={this.decline}
                    >
                      {t([DECLINE])}
                    </button>

                  </div>

                </div>
              </div>
            </div>
          )}

          {!incoming && (
            <div className={styles.footer}>
              <div className={styles.footerContentWrapper}>

                {taker && rentedUntil && (
                  <span className={styles.rentedUntilDate}>

                    {t(['rentedUntil'])}: <br />

                    {rentedUntil.format('DD/MM/YYYY')}

                  </span>
                )}

                {!(taker && rentedUntil) && (
                  <>

                    <div className={styles.infoBlock}>

                      <div className={styles.elementLevelBlock}>

                        {element && (
                          <div
                            className={styles.element}
                            style={{ backgroundImage: `url("/img/characterElements/${element}.svg")` }}
                          />
                        )}

                        <div className={styles.level}>
                          {t(['lvl'])} {level}
                        </div>

                      </div>

                      <div className={styles.characterName}>
                        {name}
                      </div>

                    </div>

                    <div
                      className={styles.characterImage}
                      style={_id ? {
                        backgroundImage: `url("/api/charImage/${_id}/${_id}.png?v=${v}")`,
                      } : null}
                    />

                  </>
                )}

                {(showList || showRent || showUnrent) && (
                  <button
                    className={cx(TERTIARY, NAV)}
                    onClick={this.toggleConfirmModal}
                  >
                    {t([showRent ?
                      RENT :
                      (showUnlist ?
                        UNLIST :
                        (showUnrent ?
                          UNRENT :
                          LIST
                        )
                      ),
                    ])}
                  </button>
                )}

              </div>
            </div>
          )}

        </div>

        {showConfirmModal && (
          <Modal
            className={styles.confirmModal}
            wrapClassName={styles.confirmModalWrap}
            onClose={this.toggleConfirmModal}
            isCloseButtonInsideContent
          >
            <ConfirmModal
              character={character}
              userId={userId}
              addSuccess={addSuccess}
              toggleConfirmModal={this.toggleConfirmModal}
              t={t}
            />
          </Modal>
        )}

      </>
    );
  }
}

export default withSub(i18n(RentTitan), function rentTitan({ match, userId, incomingRequest }) {
  const subs = [
    {
      name: ACTIVE_BALANCE,
    },
    {
      name: WEAPONS,
    },
    {
      name: RENTAL_REQUESTS,
      props: {
        userId,
      },
    },
  ];

  const characterId = get(match, ['params', 'characterId']);

  if (characterId) {
    subs.push(
      {
        name: CHARACTER,
        props: {
          characterId,
        },
      },
    );
  }

  if (incomingRequest?.taker) {
    subs.push({
      name: PUBLIC_USER,
      props: {
        userId: incomingRequest.taker,
      },
    });
  }

  return subs;
}, function mapStateToProps(state, { match, location }) {
  const user = getCurrentUser(state);

  const userId = get(user, [ID]);

  const characterId = get(match, ['params', 'characterId']);

  const { taker } = location?.state || {};

  const incomingRequest = getRequestByCharacterAndTakerId(state, { characterId, taker });

  return {
    userId,
    character: getCharacter(state, characterId),
    incomingRequest,
    requester: incomingRequest ? getUser(state, taker) : null,
  };
}, {
  addSuccess: addSuccessAction,
});
