import { FACEBOOK, TWITTER } from 'defaults';

export function share({
  nativeShare,
  platform,
  text,
  url = `${location.origin}${location.pathname}`,
}) {
  if (nativeShare && navigator.share) {
    navigator
      .share({
        text,
        url,
      });

    return;
  }

  switch (platform) {
    case FACEBOOK:
      window.open(`https://www.facebook.com/v2.7/dialog/share?app_id=${process.env.FACEBOOK_CLIENTID}&href=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}&version=v2.7`);
      break;
    case TWITTER:
      window.open(`http://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
      break;
    default:
  }
}
