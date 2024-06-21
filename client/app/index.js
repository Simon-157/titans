import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import ErrorBoundary from 'components/ErrorBoundary';
import store, { createReduxStore } from 'client/store';
import Root from './Root';
import '../css/ui.css';

function App(props) {
  const { state } = props;

  return (
    <Provider store={state ? createReduxStore(state) : store}>
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    </Provider>
  );
}

App.displayName = 'App';

App.propTypes = {
  state: PropTypes.object,
};

export default App;
