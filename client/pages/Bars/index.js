import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'lib/i18n';
import BarsContent from './BarsContent';

class Bars extends Component {
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
      <BarsContent location={location} t={t} />
    );
  }
}

export default i18n(Bars);
