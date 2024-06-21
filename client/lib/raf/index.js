import isFunction from 'lodash/isFunction';
import { emptyFunc } from 'defaults';

const callbacks = [];
let loop = emptyFunc;
let raf = null;

if (global.__CLIENT__) {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
    window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`] || window[`${vendors[x]}CancelRequestAnimationFrame`];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => {
      clearTimeout(id);
    };
  }

  let lastFrame = null;

  loop = (now) => {
    raf = requestAnimationFrame(loop);

    const deltaT = now - lastFrame;
    // do not render frame when deltaT is too high
    if (deltaT < 160) {
      let callbacksLength = callbacks.length;
      while (callbacksLength-- > 0) {
        callbacks[callbacksLength](now);
      }
    }

    lastFrame = now;
  };
}

export function registerRafCallback(callback) {
  if (!isFunction(callback)) {
    return;
  }

  const index = callbacks.indexOf(callback);

  // remove already existing the same callback
  if (index !== -1) {
    callbacks.splice(index, 1);
  }

  callbacks.push(callback);

  if (!raf) {
    raf = requestAnimationFrame(loop);
  }
}

export function unregisterRafCallback(callback) {
  const index = callbacks.indexOf(callback);

  if (index !== -1) {
    callbacks.splice(index, 1);
  }

  if (callbacks.length === 0 && raf) {
    cancelAnimationFrame(raf);
    raf = null;
  }
}
