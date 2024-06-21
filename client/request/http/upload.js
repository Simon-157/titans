import { emptyFunc, emptyObj } from 'defaults';
import { cleanString } from 'lib/string';

export function upload(file = new Blob(), config = emptyObj, callback = emptyFunc) {
  if (typeof config === 'function') {
    callback = config; // eslint-disable-line
  }

  const { name, type } = file;

  fetch('/api/upload', {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': type,
      'X-File-Name': cleanString(name),
    },
  }).then(async (response) => {
    callback(await response.json());
  }).catch((err) => { callback({ err }); });
}
