import { join } from 'path';
import dayjs from 'dayjs';
import { writeToPath } from 'fast-csv';
import { root } from 'tempy';
import each from 'lodash/each';
import set from 'lodash/set';

function transform(row) {
  each(row, (value, key) => {
    if (value instanceof Date) {
      set(row, [key], dayjs(value).format('DD/MM/YYYY HH:mm'));
    }
  });

  return row;
}

export async function exportData({ data, headers, name }) {
  if (!name) {
    return '';
  }

  await new Promise((resolve) => {
    writeToPath(join(root, name), data, { headers, transform })
      .on('finish', resolve);
  });

  return name;
}
