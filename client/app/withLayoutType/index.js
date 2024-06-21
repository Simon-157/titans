import React, { Component } from 'react';
import {
  RESIZE,
} from 'defaults';

import { getLayoutType } from 'client/helpers';

const withLayoutType = (WrappedComponent) => {
  return class ResizedComponents extends Component {
    constructor(props) {
      super(props);

      this.state = {
        layoutType: getLayoutType(),
      };

      if (global.__CLIENT__) {
        window.addEventListener(RESIZE, this.resize);
      }
    }

    componentWillUnmount() {
      window.removeEventListener(RESIZE, this.resize);
    }

    resize = () => {
      const layoutType = getLayoutType();

      if (layoutType !== this.state.layoutType) {
        this.setState({
          layoutType,
        });
      }
    }

    render() {
      const { layoutType } = this.state;

      return (
        <WrappedComponent
          layoutType={layoutType}
          {...this.props}
        />
      );
    }
  };
};

export default withLayoutType;
