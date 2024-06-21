import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  TOTAL,
} from 'defaults';
import SliderDots from 'components/SliderDots';
import { LAYOUT_TYPE } from 'client/helpers';
import withLayoutType from 'app/withLayoutType';
import { splitArrayByQuantity } from 'lib/object';
import tournamnetsData from '../../data/tournaments';
import styles from './css/styles.css';

const TOURNAMENT_ELEMENT_WIDTH = 160;
const MOBILE_TOURNAMENT_GROUP_WIDTH = 320;
const VISIBLE_TOURNAMENTS = 4;
class TournamentSelection extends Component {
  static displayName = 'TournamentSelection'

  static propTypes = {
    selectedTournamentId: PropTypes.string,
    layoutType: PropTypes.oneOf(Object.values(LAYOUT_TYPE)), // eslint-disable-line react/no-unused-prop-types
    selectTournament: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      sliderPosition: 0,
    };
  }

  setActiveIndex = (index) => {
    this.setState({
      sliderPosition: index,
    });
  }

  moveSliderLeft = () => {
    const { sliderPosition } = this.state;

    if (sliderPosition > 0) {
      this.setState({
        sliderPosition: sliderPosition - 1,
      });
    }
  }

  moveSliderRight = () => {
    const { sliderPosition } = this.state;

    const tournamentsIds = [...Object.keys(tournamnetsData)];

    if (sliderPosition < tournamentsIds.length - VISIBLE_TOURNAMENTS) {
      this.setState({
        sliderPosition: sliderPosition + 1,
      });
    }
  }

  renderTournament = (tournamentId) => {
    const { selectedTournamentId, selectTournament } = this.props;

    const imageUrl = tournamentId === TOTAL ?
      'url("/img/logo.svg")' :
      tournamentId === selectedTournamentId ?
        `url("/img/tournamentLeaderboard/${tournamentId}Icon.png")` : `url("/img/tournamentLeaderboard/${tournamentId}IconGrey.png")`;

    return (
      <div
        className={cx(styles.tournament, {
          [styles.active]: tournamentId === selectedTournamentId,
        })}
        key={tournamentId}
        onClick={() => selectTournament(tournamentId)}
      >
        <div
          className={cx(styles.tournamentIcon, styles[tournamentId])}
          style={{ backgroundImage: imageUrl }}
        />
      </div>
    );
  }

  renderMobileTournamentGroup = (tournamentsIds, index) => {
    return (
      <div className={styles.mobileTournamentGroup} key={index}>
        {tournamentsIds.map(this.renderTournament)}
      </div>
    );
  }

  render() {
    const { layoutType } = this.props;
    const { sliderPosition } = this.state;
    const tournamentsIds = [...Object.keys(tournamnetsData)];
    const mobileSlidesGroup = splitArrayByQuantity(tournamentsIds, VISIBLE_TOURNAMENTS);
    const desctopSlidesQuantity = Math.max(1, tournamentsIds.length - VISIBLE_TOURNAMENTS + 1);
    const mobileSlidesQuantity = Math.ceil(tournamentsIds.length / VISIBLE_TOURNAMENTS);
    const slidesQuantity = layoutType === LAYOUT_TYPE.MOBILE ? mobileSlidesQuantity : desctopSlidesQuantity;

    return (

      <div className={styles.mainContainer}>

        {/* NOT MOBILE LAYOUT */}
        {layoutType !== LAYOUT_TYPE.MOBILE && (
          <div className={styles.sliderContainer}>

            <div
              className={styles.tournamentsContainer}
              style={{
                transform: `translateX(${-sliderPosition * TOURNAMENT_ELEMENT_WIDTH}px)`,
              }}
            >
              {tournamentsIds.map(this.renderTournament)}
            </div>

          </div>
        )}

        {/* MOBILE LAYOUT */}
        {layoutType === LAYOUT_TYPE.MOBILE && (
          <div className={styles.sliderContainer}>

            <div
              className={styles.mobileTournamentsContainer}
              style={{
                transform: `translateX(${-sliderPosition * MOBILE_TOURNAMENT_GROUP_WIDTH}px)`,
              }}
            >
              {mobileSlidesGroup.map(this.renderMobileTournamentGroup)}
            </div>

          </div>
        )}

        <div
          className={cx(styles.arrow, styles.left, {
            [styles.disabled]: sliderPosition === 0,
          })}
          onClick={this.moveSliderLeft}
        />

        <div
          className={cx(styles.arrow, styles.right, {
            [styles.disabled]: sliderPosition >= slidesQuantity - 1,
          })}
          onClick={this.moveSliderRight}
        />

        <div className={styles.sliderDotsContainer}>
          <SliderDots
            quantity={slidesQuantity}
            activeIndex={sliderPosition}
            setActiveIndex={this.setActiveIndex}
          />
        </div>
      </div>
    );
  }
}

export default withLayoutType(TournamentSelection);
