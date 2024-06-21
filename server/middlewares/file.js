import axios from 'axios';
import { extension } from 'mime-types';
import { FILE } from 'defaults';
import translit from 'lib/translit';
import fileLib from '../lib/file';
import { response, withResponse } from '../util/response';
import { withUser } from './jwt';

const { AZURE_STORAGE_URL } = process.env;

async function getFile(req, res) {
  const { url } = req.params;

  const file = await axios.get(`${AZURE_STORAGE_URL}/${url}`, {
    responseType: 'stream',
  });

  res.setHeader('cache-control', 'max-age=31536000');
  if (url.indexOf('.svg') === url.length - 4) {
    res.setHeader('content-type', 'image/svg+xml');
  }

  file.data.pipe(res);
}

async function fileUpload(req, res) {
  const { headers } = req;

  const {
    'content-type': type,
    'x-file-name': fileName = FILE,
  } = headers;

  const url = await fileLib.uploadFile(
    `file/${translit(fileName.slice(0, 21))}-${Date.now()}.${extension(type)}`,
    req,
  );

  response(null, res, url);
}

export default function addFileMiddlewares(router) {
  router.get('/file/:url', withResponse(getFile));
  router.post('/fileUpload', withUser, withResponse(fileUpload));
}
