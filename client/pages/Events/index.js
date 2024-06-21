import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'lib/i18n';
import EventsContent from './EventsContent';

class Events extends Component {
  static displayName = 'Events'

  static propTypes = {
    location: PropTypes.object,
    lang: PropTypes.string,
    t: PropTypes.func,
  }

  shouldComponentUpdate(newProps) {
    const { lang } = newProps;

    return lang !== this.props.lang;
  }

  render() {
    const { location, t } = this.props;

    return (
      <EventsContent location={location} t={t} />
    );
  }
}

export default i18n(Events);
