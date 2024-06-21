import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOutgoingRequests } from 'reducers/rentalRequest/selectors';
import RequestsList from './RequestsList';

function RequestsOutgoing(props) {
  const { outgoing, userId, addSuccess, t } = props;

  return (
    <RequestsList
      requests={outgoing}
      userId={userId}
      addSuccess={addSuccess}
      t={t}
    />
  );
}

RequestsOutgoing.propTypes = {
  outgoing: PropTypes.array,
  userId: PropTypes.string,
  addSuccess: PropTypes.func,
  t: PropTypes.func,
};

function mapStateToProps(state, { userId }) {
  return {
    outgoing: getOutgoingRequests(state, userId),
  };
}

export default connect(mapStateToProps)(RequestsOutgoing);
