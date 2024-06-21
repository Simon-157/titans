import { createStore, compose } from 'redux';
import get from 'lodash/get';
import { emptyObj } from 'defaults';
import { useStore } from 'client/request';
import reducers from './reducers';

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    compose;

export function createReduxStore(initial = get(global, '__STORE__', emptyObj)) {
  const store = global.__STORE__ = createStore(
    reducers,
    initial,
    composeEnhancers(),
  );

  return store;
}

const store = createReduxStore();

useStore(store);

Object.defineProperty(global, 'AlertStore', {
  get() {
    return store.getState().global.alerts;
  },
});

Object.defineProperty(global, 'UserStore', {
  get() {
    return store.getState().user.list;
  },
});

export default store;
