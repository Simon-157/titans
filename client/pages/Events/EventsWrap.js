import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import each from 'lodash/each';
import _filter from 'lodash/filter';
import map from 'lodash/map';
import size from 'lodash/size';
import {
  emptyArr,
  selfReturnFunc,
  CONTAINER,
} from 'defaults';
import { getCurrentUser } from 'reducers/user/selectors';
import EventsList from './EventsList';
import PastEvents from './PastEvents';
import styles from './css/styles.css';

class EventsWrap extends Component {
  static displayName = 'EventsWrap'

  static propTypes = {
    city: PropTypes.string,
    country: PropTypes.string,
    countryCode: PropTypes.string, // eslint-disable-line
    gameId: PropTypes.string,
    games: PropTypes.object, // eslint-disable-line
    region: PropTypes.string,
    userId: PropTypes.string,
    filter: PropTypes.func,
    t: PropTypes.func,
  }

  events = emptyArr

  constructor(props) {
    super(props);

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    this.prepare(newProps);
  }

  prepare = (props = this.props, events = this.events) => {
    const { games, t } = props;

    if (this.events === emptyArr && size(events)) {
      this.events = events;
    }

    const gameIDs = {};

    each(this.events, (event) => {
      const { gameId } = event;

      if (!gameId) {
        return;
      }

      gameIDs[gameId] = true;
    });

    const filteredGames = _filter(games, ({ id }) => gameIDs[id]);

    this.games = [
      {
        id: null,
        name: t(['allGames']),
      },
      ...map(filteredGames, selfReturnFunc),
    ];
  }

  onCountryChange = ({ currentTarget: { value } }) => {
    const { filter } = this.props;

    filter({ city: null, country: value });
  }

  onCityChange = ({ currentTarget: { value } }) => {
    const { filter } = this.props;

    filter({ city: value });
  }

  setGame = ({ currentTarget: { value } }) => {
    const { filter } = this.props;

    filter({ gameId: value });
  }

  map = ({ id }) => ({
    id,
    name: id,
  })

  render() {
    const {
      city,
      country,
      gameId,
      region,
      userId,
      t,
    } = this.props;

    return (
      <>

        <div className={styles.eventsList}>
          <div className={CONTAINER}>
            <EventsList
              city={city}
              country={country}
              gameId={gameId}
              games={this.games}
              region={region}
              userId={userId}
              prepare={this.prepare}
              setGame={this.setGame}
              t={t}
            />
          </div>
        </div>

        <div className={styles.past}>

          <div className={styles.bricks} />

          <div className={CONTAINER}>
            <PastEvents
              city={city}
              country={country}
              gameId={gameId}
              region={region}
              userId={userId}
              limit={6}
            />
          </div>

        </div>

      </>
    );
  }
}

function mapStateToProps(state) {
  const user = getCurrentUser(state);
  const userId = user?.id;

  return {
    userId,
  };
}

export default connect(mapStateToProps)(EventsWrap);
