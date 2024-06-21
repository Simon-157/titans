const { resolve } = require('path');
const { readdir, writeFile } = require('fs-extra');
const { cwd } = require('./server/config');

async function onBuildStart() {
  // eslint-disable-next-line
  console.log('=> Collecting static files from previous build(s)...');

  const staticFiles = await readdir(resolve(cwd, './dist/static'));

  const jsonContent = JSON.stringify({
    files: staticFiles,
    time: Date.now(),
  });

  await writeFile(resolve(cwd, './dist/staticFilesToRemove.json'), jsonContent, 'utf8');

  // eslint-disable-next-line
  console.log('=> Previous static files collected!');
}

onBuildStart();
