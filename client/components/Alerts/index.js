import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import { registerRafCallback, unregisterRafCallback } from 'client/lib/raf';
import { getAlerts } from 'reducers/global/selectors';
import i18n from 'lib/i18n';
import styles from './css/styles.css';

class Alerts extends Component {
  static displayName = 'Alerts'

  static propTypes = {
    alerts: PropTypes.array,
    t: PropTypes.func,
  }

  lastFrame = null

  visible = false

  shouldComponentUpdate(newProps) {
    if (newProps.alerts.length === this.props.alerts.length) {
      return false;
    }

    this.lastFrame = null;

    this.visible = true;

    registerRafCallback(this.callback);

    return true;
  }

  componentWillUnmount() {
    unregisterRafCallback(this.callback);
  }

  callback = (now) => {
    this.lastFrame = this.lastFrame || now;

    if ((now - this.lastFrame) < 3000) {
      return;
    }

    unregisterRafCallback(this.callback);

    this.lastFrame = null;

    this.visible = false;

    this.forceUpdate();
  }

  render() {
    const { alerts, t } = this.props;

    if (alerts.length === 0) {
      return (
        <div className={styles.alerts} />
      );
    }

    const alert = alerts[alerts.length - 1];

    const { message, type } = alert;

    return (
      <div
        className={cx(styles.alerts, styles[type], {
          [styles.visible]: this.visible,
        })}
      >
        {t(message)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alerts: getAlerts(state),
});

export default connect(mapStateToProps)(i18n(Alerts));
