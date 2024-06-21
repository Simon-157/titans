export default function extractPublicationName(subscription) {
  const key = subscription.indexOf('?');
  let roomName = subscription;

  if (key !== -1) {
    roomName = subscription.substring(0, key);
  }

  return roomName;
}
