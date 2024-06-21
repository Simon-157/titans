import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import {
  emptyNullFunc,
  BLANK,
  CHARACTER,
  GLOBAL,
  LIST,
  NAV,
  RENT,
  REQUEST_SENT,
  TERTIARY,
  UNLIST,
  UNRENT,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { executePrimusRequest } from 'client/request';
import CharacterOwner from 'pages/Rentals/CharacterOwner';
import { getGlobal } from 'reducers/global/selectors';
import styles from './css/styles.css';

class ConfirmModal extends Component {
  static displayName = 'ConfirmModal'

  static propTypes = {
    character: PropTypes.object,
    global: PropTypes.object,
    userId: PropTypes.string,
    addSuccess: PropTypes.func,
    toggleConfirmModal: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  list = () => {
    const { character } = this.props;

    executePrimusRequest('listForRental', CHARACTER, {
      characterId: character._id,
    }, this.cb);
  }

  unlist = () => {
    const { character } = this.props;

    executePrimusRequest('unlistForRental', CHARACTER, {
      characterId: character._id,
    }, this.cb);
  }

  rent = () => {
    const { character } = this.props;

    executePrimusRequest('rent', CHARACTER, {
      characterId: character._id,
    }, this.rentCb);
  }

  unrent = () => {
    const { character } = this.props;

    executePrimusRequest('unrent', CHARACTER, {
      characterId: character._id,
    }, this.cb);
  }

  cb = (err) => {
    if (err) {
      return;
    }

    const { addSuccess, toggleConfirmModal } = this.props;

    addSuccess();
    toggleConfirmModal();
  }

  rentCb = (err) => {
    if (err) {
      return;
    }

    const { addSuccess, toggleConfirmModal, t } = this.props;

    addSuccess(t([REQUEST_SENT]));
    toggleConfirmModal();
  }

  render() {
    const { character, global, userId, t } = this.props;

    const { _id, maker, name, taker, v } = character;

    let { owner } = character;
    if (!owner) {
      owner = character.userId;
    }

    const showList = userId === owner && !taker;

    const showUnlist = showList && maker === userId;

    const showRent = !showList && maker !== userId && !taker;

    const showUnrent = taker === userId;

    return (
      <div className={styles.modalContent}>

        <div className={styles.characterDesc}>

          <div
            className={styles.characterImage}
            style={{
              backgroundImage: `url("/api/charImage/${_id}/${_id}.png?v=${v}")`,
            }}
          />

          <div className={styles.characterNameSection}>

            <div className={styles.characterName}>
              {name}
            </div>

            <CharacterOwner character={character} t={t} />

            <div className={styles.rentUntilDate}>

              <span>
                {t(['rentUntil'])}:&nbsp;
              </span>

              <span className={styles.date}>
                {global.rentedUntil?.format('DD/MM/YYYY')}
              </span>

            </div>

            {!showRent && !showUnlist && !showUnrent && (
              <div className={styles.warning}>
                {t(['rentWarning'])}
              </div>
            )}

            {null
              // <div className={styles.rentInfo}>
              //
              //   {t(['rentedUntil'])}:
              //
              //   <span> OCT 2ND</span>
              //
              // </div>
            }

          </div>

        </div>

        <button
          className={cx(TERTIARY, NAV, styles.rentButton)}
          onClick={showRent ?
            this.rent :
            (showUnlist ?
              this.unlist :
              (showUnrent ?
                this.unrent :
                this.list
              )
            )
          }
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

        <div className={styles.rentRewards}>
          {t(['rentConfirmModalRewards'])}
        </div>

        <div className={styles.termAndConditions}>

          {t(['byProceedingYouAgree'])}

          <Link to={'/documents/terms.pdf'} target={BLANK}>
            {t(['termsOfService'])}
          </Link>

          {t(['andConfirmYouHaveRead'])}

          <a href={'/documents/privacy.pdf'} target={BLANK}>
            {t(['privacyPolicy'])}
          </a>

        </div>

      </div>
    );
  }
}

export default withSub(ConfirmModal, [{
  name: GLOBAL,
}], function mapStateToProps(state) {
  return {
    global: getGlobal(state),
  };
});
