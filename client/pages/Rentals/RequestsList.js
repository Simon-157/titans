import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import RequestsItem from './RequestsItem';

class RequestsList extends Component {
  static displayName = 'RequestsList'

  static propTypes = {
    now: PropTypes.object,
    requests: PropTypes.array,
    incoming: PropTypes.bool,
    addSuccess: PropTypes.func,
    t: PropTypes.func,
  }

  renderRequest = (request) => {
    const { now, incoming, addSuccess, t } = this.props;

    const { _id, characterId } = request;

    return (
      <RequestsItem
        key={_id}
        _id={_id}
        characterId={characterId}
        now={now}
        request={request}
        incoming={incoming}
        addSuccess={addSuccess}
        t={t}
      />
    );
  }

  render() {
    const { requests } = this.props;

    return map(requests, this.renderRequest);
  }
}

export default RequestsList;
