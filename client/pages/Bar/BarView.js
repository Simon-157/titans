import { Component } from 'react';
import PropTypes from 'prop-types';
import { BAR, GA_EVENT, VIEW } from 'defaults';
import { executePrimusRequest } from 'client/request';
import { dataLayerPush } from 'client/helpers';

class BarView extends Component {
  static propTypes = {
    barId: PropTypes.string,
    name: PropTypes.string,
  }

  componentDidMount() {
    const { barId, name } = this.props;

    if (!barId) {
      return;
    }

    executePrimusRequest(VIEW, BAR, { barId });
    dataLayerPush({
      event: GA_EVENT,
      eventCategory: 'Bar View',
      eventAction: 'View',
      eventLabel: name,
    });
  }

  render() {
    return null;
  }
}

export default BarView;
