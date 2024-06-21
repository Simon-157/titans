import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { emptyNullFunc } from 'defaults';
import 'client/lib/console';
import AppComp from './app/index';

let AppWithWallets = emptyNullFunc;
class App extends Component {
  static displayName = 'App'

  constructor(props) {
    super(props);

    if (!process.env.DISABLE_WALLET && AppWithWallets === emptyNullFunc) {
      import('./AppWithWallets').then((m) => {
        AppWithWallets = m.default;

        this.forceUpdate();
      });
    }
  }

  render() {
    if (process.env.DISABLE_WALLET) {
      return (
        <BrowserRouter>
          <AppComp />
        </BrowserRouter>
      );
    }

    return (
      <AppWithWallets />
    );
  }
}

export default App;
