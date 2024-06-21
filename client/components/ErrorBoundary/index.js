import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import map from 'lodash/map';
import { CONTAINER, ERROR, LOG, PAGE, WRITE } from 'defaults';
import { executePrimusRequest } from 'client/request';
import styles from './css/styles.css';

class ErrorBoundary extends Component {
  static displayName = 'ErrorBoundary'

  static propTypes = {
    children: PropTypes.node,
  }

  state = {}

  componentDidCatch(error, info) {
    const { message, stack } = error;

    this.setState({
      error,
    });

    executePrimusRequest(WRITE, LOG, {
      data: info.componentStack,
      message,
      pathname: location.pathname,
      stack,
      type: ERROR,
    });
  }

  render() {
    const { error } = this.state;

    if (error) {
      const { message, stack } = error;

      return (
        <div className={cx(CONTAINER, PAGE, styles.error)}>

          <div>
            Something didn{'\''}t go as expected
          </div>

          <br />

          <div>
            Try to restart the application. If that doesn{'\''}t help, please send the below details to

            {' '}

            <a href={'mailto:admin@reignoftitans.org'}>
              admin@reignoftitans.org
            </a>

            <br />

            <br />

            Apologies for the inconvenience

          </div>

          <br />

          <div>

            <div>
              {message}
            </div>

            <div>
              {map(stack.split('\n'), (str, key) => (
                <div key={key}>
                  {str}
                </div>
              ))}
            </div>

          </div>

        </div>
      );
    }

    const { children } = this.props;

    return children;
  }
}

export default ErrorBoundary;
