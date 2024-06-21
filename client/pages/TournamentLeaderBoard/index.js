import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  title,
  ARROW,
  SUBMIT,
  TERTIARY,
  TOTAL,
} from 'defaults';
import i18n from 'lib/i18n';
import { LAYOUT_TYPE } from 'client/helpers';
import Helmet from 'components/Helmet';
import withLayoutType from 'app/withLayoutType';
import TournamentSelection from './components/TournamentSelection';
import Tournament from './components/Tournament';
import styles from './css/styles.css';

class TournamentLeaderBoard extends Component {
  static displayName = 'TournamentLeaderBoard'

  static propTypes = {
    layoutType: PropTypes.oneOf(Object.values(LAYOUT_TYPE)), // eslint-disable-line react/no-unused-prop-types
    history: PropTypes.object,
    location: PropTypes.object,
    t: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedTournament: props.layoutType === LAYOUT_TYPE.MOBILE ? '' : TOTAL,
    };

    this.scrollRef = React.createRef();
    this.headerRef = React.createRef();
  }

  componentWillUnmount() {
    this.scrollRef.current.removeEventListener('scroll', this.onScroll);
  }

  componentDidMount() {
    this.scrollRef.current.addEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (this.scrollRef.current.scrollTop > 100) {
      this.headerRef.current.classList.add('opaqueHeader');
    } else {
      this.headerRef.current.classList.remove('opaqueHeader');
    }
  }

  selectTournament = (tournamentId) => {
    this.setState({
      selectedTournament: tournamentId,
    });
  }

  goBack = () => {
    const { layoutType, history } = this.props;
    const { selectedTournament } = this.state;

    if (layoutType === LAYOUT_TYPE.MOBILE && selectedTournament) {
      this.setState({
        selectedTournament: '',
      });
    } else {
      history.push('/');
    }
  }

  render() {
    const { layoutType, location, t } = this.props;

    const { selectedTournament } = this.state;

    const { pathname } = location;

    const seoLink = `https://${process.env.HOSTNAME || 'reignoftitans.gg'}${pathname}`;

    const seoTitle = `Tournament Leaderboard - ${title}`;

    return (
      <div
        className={styles.fullScreen}
        ref={this.scrollRef}
      >

        <Helmet
          title={seoTitle}
          link={seoLink}
        />

        <div
          className={styles.header}
          ref={this.headerRef}
        >
          <div className={styles.backButton}>
            <button
              className={TERTIARY}
              type={SUBMIT}
              onClick={this.goBack}
            >

              <img src={'/img/explore/arrow-left-blue.svg'} alt={ARROW} />

              {t(['back'])}

            </button>
          </div>
        </div>

        <div className={styles.content}>

          {(layoutType !== LAYOUT_TYPE.MOBILE || !selectedTournament) && (
            <div className={styles.topSection}>

              <div className={styles.mask2} />

              <div className={styles.subTitle}>

                <span className={styles.line} />

                <span className={styles.subtitleText}>
                  {t(['reignOfTitans'])}
                </span>

                <span className={styles.line} />

              </div>

              <h1 className={styles.title}>
                {t(['tournamentLeaderboard'])}
              </h1>

              <div className={styles.makeASelection}>
                {t(['makeASelection'])}
              </div>

              <TournamentSelection
                selectedTournamentId={this.state.selectedTournament}
                selectTournament={this.selectTournament}
              />

            </div>
          )}

          {(selectedTournament) && (
            <Tournament
              tournamentId={selectedTournament}
              layoutType={layoutType}
              t={t}
            />
          )}

        </div>

      </div>
    );
  }
}

export default i18n(withLayoutType(TournamentLeaderBoard));
