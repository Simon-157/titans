import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CIRCLE, SECONDARY } from 'defaults';
import styles from './css/styles.css';

class Accordeon extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.string,
    onOpen: PropTypes.func,
  }

  state = {
    opened: this.props.active,
  }

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      this.setState({ opened: this.props.active });
    }
  }

  toggleOpened = () => {
    const { onOpen } = this.props;

    const { opened } = this.state;

    if (onOpen) {
      onOpen();
    }

    this.setState({
      opened: !opened,
    });
  }

  render() {
    const { children, className, label } = this.props;

    const { opened } = this.state;

    return (
      <div className={cx(className, styles.accordion, { [styles.opened]: opened })}>

        <div
          className={styles.label}
          onClick={this.toggleOpened}
        >

          <button className={cx(SECONDARY, CIRCLE, styles.toggleButton)} />

          {label}

        </div>

        <div className={styles.content}>
          {opened ? children : null}
        </div>

      </div>
    );
  }
}

export default Accordeon;
