import 'core-js';
import 'regenerator-runtime/runtime';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { configure } from 'enzyme';
import { emptyFunc } from 'defaults';
import { handleError } from 'lib/error';
import reducers from 'reducers';
import 'client/lib/console';

configure({ adapter: new Adapter() });

const { warn } = console;

// eslint-disable-next-line no-console
console.warn = function consoleWarning(err) {
  // eslint-disable-next-line no-param-reassign
  err = handleError(err);

  if (err.indexOf('Jest\'s default jsdom') !== -1) {
    return;
  }

  // eslint-disable-next-line prefer-rest-params
  warn.apply(console, arguments);
};

global.fetch = function fetch() {
  return {
    json: emptyFunc,
  };
};

global.mockStore = (state = {}) => createStore(
  reducers,
  state,
);

global.updateSub = emptyFunc;
