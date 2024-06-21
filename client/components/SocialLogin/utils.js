export function openCenteredPopup(url, width, height) {
  const screenX = typeof window.screenX !== 'undefined' ?
    window.screenX :
    window.screenLeft;

  const screenY = typeof window.screenY !== 'undefined' ?
    window.screenY :
    window.screenTop;

  const outerWidth = typeof window.outerWidth !== 'undefined' ?
    window.outerWidth :
    document.body.clientWidth;

  const outerHeight = typeof window.outerHeight !== 'undefined' ?
    window.outerHeight :
    (document.body.clientHeight - 22);

  // Use `outerWidth - width` and `outerHeight - height` for help in
  // positioning the popup centered relative to the current window
  let left = (screenX + (outerWidth - width) / 2) | 0;
  let top = (screenY + (outerHeight - height) / 2) | 0;

  if (left < 0) {
    left = 0;
  }

  if (top < 0) {
    top = 0;
  }

  const features = `width=${width},height=${height
  },left=${left},top=${top},scrollbars=yes`;

  return window.open(url, 'Login', features);
}

export const rslError = (errorObject) => {
  const error = [];

  error.push(`[${errorObject.provider}][${errorObject.type}] ${errorObject.description}`);

  if (errorObject.error) {
    error.push(JSON.stringify(errorObject.error, null, 2));
  }

  return Error(error.join('\n\nORIGINAL ERROR: '));
};

export const timestampFromNow = (duration) => {
  const expiresAt = new Date();

  return expiresAt.setSeconds(expiresAt.getSeconds() + duration);
};
