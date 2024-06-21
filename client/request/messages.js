import { emptyObj } from 'defaults';

const messages = {};

export function registerResponseMessage(type, func) {
  messages[type] = (store, data = emptyObj) => {
    const { err } = data;

    if (err === 401 && location.pathname !== '/') {
      location.pathname = '/';
      return;
    }

    func(store, data);
  };
}

export default messages;
