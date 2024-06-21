import each from 'lodash/each';

export const requested = {};

export function clearRequested() {
  each(requested, (_, key) => {
    delete requested[key];
  });
}
