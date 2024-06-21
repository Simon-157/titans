import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { withSub } from 'client/lib/sub';
import { getBarLeaderboard } from 'reducers/barLeaderboard/selectors';

class BarLeaderboard extends Component {
  static displayName = 'BarLeaderboard'

  static propTypes = {
    leaderboard: PropTypes.array,
  }

  renderRow = (row, index) => {
    const { _id, points, userId, username } = row;

    return (
      <div key={_id}>
        {index}) {username || userId}: {points}
      </div>
    );
  }

  render() {
    const { leaderboard } = this.props;

    return (
      map(leaderboard, this.renderRow)
    );
  }
}

export default withSub(BarLeaderboard, function barContentSub({ barId }) {
  return [{
    name: 'barLeaderboard',
    props: {
      barId,
    },
  }];
}, function mapStateToProps(state, { barId }) {
  return {
    leaderboard: getBarLeaderboard(state, { barId }),
  };
});
