import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addClass, removeClass } from 'client/helpers';
import styles from './css/styles.css';

class Content extends Component {
  static propTypes = {
    children: PropTypes.object,
    active: PropTypes.bool, // eslint-disable-line
  }

  ref = (c) => {
    this.c = c;

    addClass(this.c, styles.active);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.active) {
      addClass(this.c, styles.active);
    } else {
      removeClass(this.c, styles.active);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div
        className={styles.contentItem}
        ref={this.ref}
      >
        {children}
      </div>
    );
  }
}

export default Content;
