import { handleError } from 'lib/error';

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'test'
) {
  const { warn } = console;

  // eslint-disable-next-line no-console
  console.warn = function consoleWarning(err) {
    // eslint-disable-next-line no-param-reassign
    err = handleError(err);

    if (err.indexOf('unsafe') !== -1) {
      return;
    }

    // eslint-disable-next-line prefer-rest-params
    warn.apply(console, arguments);
  };
}

if (process.env.NODE_ENV === 'test') {
  const { error } = console;

  // eslint-disable-next-line no-console
  console.error = function consoleError(err) {
    // eslint-disable-next-line no-param-reassign
    err = handleError(err);

    if (
      err.indexOf('useLayoutEffect') !== -1 ||
      err.indexOf('on the server. This is a no-op') !== -1
    ) {
      return;
    }

    // eslint-disable-next-line prefer-rest-params
    error.apply(console, arguments);
  };
}
