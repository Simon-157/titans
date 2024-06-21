import { image } from 'qr-image';
import { Code, Promo } from 'collections';
import { randomId, randomString } from 'lib/random';
import fileLib from './file';

const NUMERIC = '23456789';
const UPPERCASE = 'ABCDEFGHJKLMNPQRSTWXYZ';

function getCode(length = 4) {
  if (length > 5) {
    length = 5; // eslint-disable-line no-param-reassign
  }

  return `${randomString(length, NUMERIC)}-${randomString(length, UPPERCASE)}`;
}

export async function checkForCode(initial, code = initial) {
  const exists = await Code.collection.findOne({
    code,
  }, {
    projection: {
      _id: 1,
    },
  });

  if (exists) {
    // eslint-disable-next-line no-param-reassign
    code = await checkForCode(initial, getCode());
  }

  return code;
}

export async function generateCode({
  eventId,
  online = null,
  promoId,
  userId,
}) {
  const query = {
    online,
    promoId,
    userId,
  };

  const codeRecord = await Code.collection.findOne({
    query,
  }, {
    projection: {
      _id: 1,
    },
  });

  if (!codeRecord) {
    const promo = await Promo.collection.findOne({
      _id: promoId,
    }, {
      projection: {
        _id: 1,
        quantityLeft: 1,
        quantityLeftForOnline: 1,
      },
    });

    if (promo) {
      const { quantityLeft, quantityLeftForOnline } = promo;

      if ((online ? quantityLeftForOnline : quantityLeft) > 0) {
        const predefinedCode = await Code.collection.findOne({
          promoId: null,
        }, {
          projection: {
            _id: 1,
          },
        });

        if (predefinedCode) {
          await Code.collection.updateOne({
            _id: predefinedCode._id,
          }, {
            $set: {
              online,
              promoId,
              userId,
            },
          });

          global.updateSub(`codeForEvent?eventId=${eventId}&userId=${userId}"`);
        } else {
          const codeId = randomId();

          const code = await checkForCode(getCode());

          await Code.create({
            _id: codeId,
            code,
            online,
            promoId,
            userId,
          });

          global.updateSub(`codeForEvent?eventId=${eventId}&userId=${userId}"`);

          const now = Date.now();

          const link = `${process.env.FRONTEND_PATH}/qr/${code}`;

          const codeImg = image(link, { type: 'svg' });

          codeImg.headers = {
            'cache-control': 'max-age=31536000',
            'content-type': 'image/svg+xml',
          };

          const img = await fileLib.uploadFile(`${code}-${now}.svg`, codeImg, { validate: false });

          await Code.collection.updateOne({
            _id: codeId,
          }, {
            $set: {
              img,
            },
          });

          global.updateSub(`codeForEvent?eventId=${eventId}&userId=${userId}"`);

          const codePng = image(link, { type: 'png' });

          codePng.headers = {
            'content-type': 'image/png',
          };

          const png = await fileLib.uploadFile(`${code}-${now}.png`, codePng, { validate: false });

          await Code.collection.updateOne({
            _id: codeId,
          }, {
            $set: {
              png,
            },
          });
        }

        await Promo.collection.updateOne({
          _id: promoId,
        }, {
          $inc: {
            [online ? 'quantityLeftForOnline' : 'quantityLeft']: -1,
          },
        });
      }
    }
  }
}
