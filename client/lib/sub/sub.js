import each from 'lodash/each';

export const reactiveSubs = {};
export const subscriptions = {};

export function clearSub() {
  each(reactiveSubs, (_, key) => {
    delete reactiveSubs[key];
  });

  each(subscriptions, (_, key) => {
    delete subscriptions[key];
  });
}
