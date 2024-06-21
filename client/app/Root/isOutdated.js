export function isOutdated() {
  const userAgent = navigator.userAgent.toLowerCase();

  const isIE = userAgent.indexOf('msie') !== -1;

  if (isIE) {
    return true;
  }

  const isOperaMini = userAgent.indexOf('opera mini') !== -1;

  if (isOperaMini) {
    return true;
  }

  return false;
}
