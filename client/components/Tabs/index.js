import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import { CONTENT, DIV, MENU } from 'defaults';
import Nav from './Nav';
import Content from './Content';
import styles from './css/styles.css';

class Tabs extends Component {
  static displayName = 'Tabs'

  static propTypes = {
    className: PropTypes.string,
    tabs: PropTypes.array,
    selected: PropTypes.number,
    underline: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    selected: 0,
  }

  constructor(props) {
    super(props);

    const { selected } = props;

    this.state = {
      index: selected || 0,
      prevIndex: selected || 0,
    };
  }

  shouldComponentUpdate(newProps, newState) {
    const { selected } = newProps;

    const { index } = newState;

    if (selected !== index) {
      this.state.index = selected;
      this.state.prevIndex = index;
    }

    return true;
  }

  onNavClick = (index) => {
    const { index: prevIndex } = this.state;

    if (index === prevIndex) {
      return;
    }

    const { onChange } = this.props;

    this.setState({
      index,
      prevIndex,
    });

    this.hidePrevIndex();

    if (isFunction(onChange)) {
      onChange(index);
    }
  }

  hidePrevIndex = () => {
    this.setState({
      prevIndex: null,
    });
  }

  renderNav = (tab, key) => {
    const { index } = this.state;

    const { label, link, counter } = tab;

    return (
      <Nav
        key={key}
        index={key}
        label={label}
        link={link}
        active={index === key}
        onClick={this.onNavClick}
        counter={counter}
      />
    );
  }

  renderContent = (tab, key) => {
    const { index, prevIndex } = this.state;

    if ([index, prevIndex].indexOf(key) === -1) {
      return null;
    }

    const { content } = tab;

    return (
      <Content key={key} active={index === key}>
        {content}
      </Content>
    );
  }

  render() {
    const { className, tabs, underline } = this.props;

    let Comp;
    let props;
    if (className) {
      Comp = DIV;
      props = {
        className,
      };
    } else {
      Comp = Fragment;
    }

    return (
      <Comp {...props}>

        <div
          className={cx(MENU, styles.nav, {
            [styles.underline]: underline,
          })}
        >
          {map(tabs, this.renderNav)}
        </div>

        <div className={cx(CONTENT, styles.content)}>
          {map(tabs, this.renderContent)}
        </div>

      </Comp>
    );
  }
}

export default Tabs;
