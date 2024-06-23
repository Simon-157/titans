export const timeAgo = (date)=> {
  const now = new Date();
  const givenDate = new Date(date);
  const secondsAgo = Math.floor((now - givenDate) / 1000);

  let interval = Math.floor(secondsAgo / 31536000);
  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(secondsAgo / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(secondsAgo / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(secondsAgo / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(secondsAgo / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(secondsAgo)} seconds ago`;
}

