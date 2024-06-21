import { Readable } from 'stream';
import { createBlobService } from 'azure-storage';
import { BlobServiceClient } from '@azure/storage-blob';
import ByteBuffer from 'bytebuffer';
import { fromBuffer } from 'file-type';
import axios from 'axios';
import pify from 'pify';
import bind from 'lodash/bind';
import get from 'lodash/get';
import { emptyObj, emptyStr } from 'defaults';

const {
  AZURE_STORAGE_CONNECTION_STRING,
  AZURE_STORAGE_URL,
  TINIFY_KEY,
} = process.env;

const allowedFileTypes = [
  'application/xml',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
];

const compressableFileTypes = [
  'image/jpeg',
  'image/png',
];

let blobService;
let setBlobProperties;
let imageContainer;

const headersToHide = ['host', 'origin', 'referer', 'user-agent', 'x-access-token', 'x-impersonate-jwt', 'x-impersonate-name'];

const azureStorageFunctions = {
  async uploadFile(key, data, { validate = true } = emptyObj) {
    const isStream = data instanceof Readable;

    let file = isStream ? data : (data.buffer || data.data);

    let type;

    if (isStream) {
      // type = get(data.headers, ['content-type']);

      const length = get(data.headers, ['content-length']);

      if (length > 5120000) {
        throw '403 Forbidden - File Size Exceeded';
      }

      const bufferData = file._readableState?.buffer?.head?.data;

      if (bufferData) {
        const { byteLength } = bufferData;

        const buffer = new ByteBuffer(byteLength);
        buffer.littleEndian = true;
        buffer.buffer = bufferData;

        let string = emptyStr;
        try {
          string = buffer.readString(byteLength);
        } catch (err) {} // eslint-disable-line

        if (string.indexOf('<?') !== -1) {
          throw '403 Forbidden - Wrong File Format';
        }

        const fileType = await fromBuffer(bufferData);

        if (fileType && fileType.mime) {
          type = fileType.mime;
        }
      }
    } else {
      try {
        const { byteLength } = file;

        const buffer = new ByteBuffer(byteLength);
        buffer.littleEndian = true;
        buffer.buffer = file;

        let string = emptyStr;
        try {
          string = buffer.readString(byteLength);
        } catch (err) {} // eslint-disable-line

        if (string.indexOf('<?') !== -1) {
          throw '403 Forbidden - Wrong File Format';
        }

        const fileType = await fromBuffer(file);

        if (fileType && fileType.mime) {
          type = fileType.mime;
        }
      } catch (err) {
        // Debug file upload for now
        // eslint-disable-next-line no-console
        console.log('Error while executing uploadFile:');
        // eslint-disable-next-line no-console
        console.log(file);
      }
    }

    if (validate && allowedFileTypes.indexOf(type) === -1) {
      throw '403 File Type Forbidden';
    }

    const blockBlobClient = imageContainer.getBlockBlobClient(key);

    let checked;

    let buffer = [];
    if (isStream) {
      file.on('data', async function onUploadFileStreamChunk(chunk) {
        buffer.push(chunk);

        if (checked) {
          return;
        }

        try {
          const fileType = await fromBuffer(chunk);

          if (fileType && fileType.mime) {
            type = fileType.mime;
            checked = true;
          }
        } catch (err) {} // eslint-disable-line no-empty
      });

      file.on('end', function onUploadFileStreamEnd() {
        file = Buffer.concat(buffer);
      });
    }

    if (
      !TINIFY_KEY ||
      compressableFileTypes.indexOf(type) === -1
    ) {
      if (isStream) {
        await blockBlobClient.uploadStream(file);
      } else {
        await blockBlobClient.upload(file, file.length);
      }
    } else {
      let r;
      let error;
      try {
        let headersToHideLength = headersToHide.length;
        while (headersToHideLength-- > 0) {
          const header = headersToHide[headersToHideLength];

          delete file.headers[header];
        }

        r = await axios.post(`https://api:${TINIFY_KEY}@api.tinify.com/shrink`, file);
      } catch (err) {
        error = err;
      }

      if (allowedFileTypes.indexOf(type) === -1) {
        throw '403 File Type Forbidden';
      }

      if (error || r.status !== 201) {
        await blockBlobClient.upload(file, file.length);
      } else {
        const tinyfied = await axios.get(r.data.output.url, {
          responseType: 'stream',
        });

        await blockBlobClient.uploadStream(tinyfied.data);
      }
    }

    await setBlobProperties('cryptotitans', key, {
      cacheControl: 'max-age=31536000',
      contentType: type,
    });

    buffer = null;
    file = null;

    return `${AZURE_STORAGE_URL}/${key}`;
  },
};

async function main() {
  const connectionString = AZURE_STORAGE_CONNECTION_STRING;

  blobService = createBlobService(connectionString);
  setBlobProperties = pify(bind(blobService.setBlobProperties, blobService));

  azureStorageFunctions.blobServiceClient = await BlobServiceClient.fromConnectionString(connectionString);

  imageContainer = await azureStorageFunctions.blobServiceClient.getContainerClient('cryptotitans');
}

main();

export default azureStorageFunctions;
