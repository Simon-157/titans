import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FixedSizeList } from 'react-window';
import isEqual from 'lodash/isEqual';
import {
  emptyNullFunc,
  NAV,
  TOTAL,
  TERTIARY,
  POINTS,
} from 'defaults';
import { addNumberEnding } from 'lib/string';
import { LAYOUT_TYPE } from 'client/helpers';
import tournamnetsData from '../../data/tournaments';
import styles from './css/styles.css';

class Tournament extends Component {
  static displayName = 'Tournament'

  static propTypes = {
    tournamentId: PropTypes.string,
    layoutType: PropTypes.oneOf(Object.values(LAYOUT_TYPE)), // eslint-disable-line react/no-unused-prop-types
    t: PropTypes.func,
  }

  static defaultProps = {
    t: emptyNullFunc,
  }

  tabs = []

  constructor(props) {
    super(props);

    this.state = {
      tab: '',
    };

    this.prepare();
  }

  prepare(props = this.props) {
    const { tournamentId } = props;

    if (tournamentId === TOTAL) {
      this.tabs = [TOTAL];
    } else {
      this.tabs = Object.keys(tournamnetsData[tournamentId]);
    }
    if (!this.state.tab !== this.tabs[0]) {
      this.state.tab = this.tabs[0];
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsDifferent = !isEqual(this.props, nextProps);

    const isStateDifferent = nextState.tab !== this.state.tab;

    if (isPropsDifferent) {
      this.prepare(nextProps);
    }

    return isPropsDifferent || isStateDifferent;
  }

  renderTab = (tab) => {
    const { t } = this.props;

    const active = tab === this.state.tab;

    return (
      <button
        key={tab}
        className={cx(NAV, TERTIARY, styles.tab, {
          [styles.active]: active,
        })}
        onClick={() => {
          this.setState({ tab });
        }}
      >
        {t([tab])}
      </button>
    );
  }

  renderWinner = (winner, index) => {
    const { t } = this.props;

    return (
      <div className={styles.winner} key={winner.n}>

        <div className={styles.winnerIcon}>

          <img
            src={`/img/tournamentLeaderboard/place${index + 1}.png`}
            alt={index + 1}
          />

          {addNumberEnding(index + 1)}

        </div>

        <div className={styles.winnerName}>
          {t([winner.n])}
        </div>

      </div>
    );
  }

  renderPlayerRank = ({ index, style }) => {
    const { tournamentId } = this.props;

    const row = tournamnetsData[tournamentId][this.state.tab].result[index];

    const { n, p } = row;

    return (
      <div style={style} key={index}>
        <div className={styles.row}>

          <div className={styles.rank}>
            {addNumberEnding(index + 1)}
          </div>

          <div className={styles.player}>
            {n}
          </div>

          <div className={styles.points}>
            {p}
          </div>

        </div>
      </div>
    );
  };

  renderPlayerRankMobile = ({ index, style }) => {
    const { tournamentId, t } = this.props;

    const row = tournamnetsData[tournamentId][this.state.tab].result[index];

    const { n, p } = row;

    return (
      <div style={style} key={index}>
        <div className={cx(styles.row, styles.mobile)}>

          <div className={styles.rank}>
            {addNumberEnding(index + 1)}  <span>{n}</span>
          </div>

          <div className={styles.points}>
            {t([POINTS, POINTS])}: {p}
          </div>

        </div>
      </div>
    );
  };

  render() {
    const { tournamentId, layoutType, t } = this.props;

    const imageUrl = tournamentId === TOTAL ?
      'url("/img/tournamentLeaderboard/logoTop.svg")' : `url("/img/tournamentLeaderboard/${tournamentId}Icon.png")`;

    const tournamentData = tournamnetsData[tournamentId][this.state.tab];

    const isMobile = layoutType === LAYOUT_TYPE.MOBILE;

    return (
      <div className={styles.container}>

        <div className={styles.iconSection}>

          {isMobile && <div className={styles.mask} />}

          <div className={cx(styles.top, styles[tournamentId])}>

            <div
              className={styles.tournamentIcon}
              style={{ backgroundImage: imageUrl }}
            />

            <div className={styles.descSection}>

              <div className={styles.title}>
                {t(['tournamentsTitle', tournamentId])}
              </div>

              <div className={styles.desc}>
                {t(['tournamentsDesc', tournamentId])}
              </div>

            </div>

          </div>

        </div>

        {this.tabs.length > 1 && (
          <div className={styles.tabContainer}>
            {this.tabs.map(this.renderTab)}
          </div>
        )}

        {tournamentId !== TOTAL && tournamentData.winners?.length && (
          <div className={styles.winnerContainer}>
            {tournamentData.winners.map(this.renderWinner)}
          </div>
        )}

        <div className={styles.tableDesc}>
          {tournamentId === TOTAL ?
            t(['tournamentsTotalTableDesc']) :
            t(['tournamentsTableDesc'])
          }
        </div>

        <div className={cx(styles.row, styles.caption)}>

          <div className={styles.rank}>
            {t(['rank'])}
          </div>

          <div className={styles.player}>
            {t(['player'])}
          </div>

          <div className={styles.points}>
            {t([POINTS, POINTS])}
          </div>

        </div>

        <FixedSizeList
          className={'fixedSizeList'}
          height={850}
          width={'100%'}
          itemCount={tournamentData.result.length}
          itemSize={isMobile ? 95 : 56}
        >
          {isMobile ? this.renderPlayerRankMobile : this.renderPlayerRank}
        </FixedSizeList>

      </div>
    );
  }
}

export default Tournament;
