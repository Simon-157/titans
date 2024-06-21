const { resolve } = require('path');
const { readFile, stat, unlink } = require('fs-extra');
const { cwd } = require('./server/config');

async function onBuildEnd() {
  // eslint-disable-next-line
  console.log('=> Erase static files from previous build(s)...');

  const oldStatic = await readFile(resolve(cwd, './dist/staticFilesToRemove.json'));

  const { files, time } = JSON.parse(oldStatic);

  let count = 0;

  let oldStaticFilesLength = files.length;
  while (oldStaticFilesLength-- > 0) {
    const file = files[oldStaticFilesLength];

    const filePath = resolve(cwd, `./dist/static/${file}`);

    // eslint-disable-next-line
    const { mtimeMs } = await stat(filePath); // allow await here

    if (mtimeMs < time) {
      // eslint-disable-next-line
      await unlink(filePath) // allow await here

      count++;
    }
  }

  // eslint-disable-next-line
  console.log(`=> Erased ${count} of previous static files!`);
}

onBuildEnd();
