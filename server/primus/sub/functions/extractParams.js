import { parse } from 'qs';

function extractParams(nameWithParams) {
  const index = nameWithParams.indexOf('?');

  if (index === -1) {
    return null;
  }

  const params = nameWithParams.substr(index + 1);

  // replace inside double quotes
  return parse(params.replace(/="[^"]+/g, (match) => {
    // replace ampersand
    return match.replace('&', '%26');
  }).replace(/"/g, '')); // replace double quotes
}

export default extractParams;
