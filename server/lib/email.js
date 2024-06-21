import client from '@sendgrid/mail';
import isArray from 'lodash/isArray';
import { emptyObj, ERROR } from 'defaults';
import { MailQueue } from 'collections';
import { writeLog } from '../primus/log';
import renderer, { getLangByCountry, t } from '../templates';
// import encryptor from './encryptor';
import transports from './smtp';

const { smtp } = transports;

const {
  HOSTNAME = 'reignoftitans.gg', // root path for images and links in email
  PLATFORM_MAIL,
  PLATFORM_NAME,
  SENDGRID_API_KEY = 'SG.',
  SMTP_HOST,
} = process.env;

client.setApiKey(SENDGRID_API_KEY);

export async function sendEmail(toEmail, data = emptyObj) {
  if (!toEmail) {
    return;
  }

  const { subject } = data;

  const opts = {
    bannerImage: '/img/email/banner.jpg',
    hostname: HOSTNAME,
    platformName: PLATFORM_NAME,
    unsubscribeLink: `https://${HOSTNAME}/profile`,
    ...data,
  };

  const html = renderer.render('layout', opts);

  const options = {
    to: toEmail,
    from: `${PLATFORM_NAME} <${PLATFORM_MAIL}>`,
    subject,
    html,
  };

  if (SMTP_HOST) {
    smtp.sendMail(options, async function sendMailCb(err) {
      if (err) {
        const { stack } = err;

        writeLog(null, {
          handler: 'email',
          message: err,
          server: true,
          stack,
          type: ERROR,
        });

        try {
          if (isArray(toEmail)) {
            await client.sendMultiple(options);
          } else {
            await client.send(options);
          }
        } catch (err2) {
          await MailQueue.create({
            options,
          });
        }
      }
    });
  } else {
    try {
      if (isArray(toEmail)) {
        await client.sendMultiple(options);
      } else {
        await client.send(options);
      }
    } catch (err) {
      await MailQueue.create({
        options,
      });
    }
  }
}

export async function sendRegistrationEmail(user, country) {
  const { email, username } = user;

  const lang = getLangByCountry(country);

  const data = {
    bodyTextBlock1: t(['welcomeText'], lang, { hostname: HOSTNAME }),
    buttonText: t(['playNow'], lang),
    buttonUrl: `https://${HOSTNAME}`,
    // buttonUrl: `https://${HOSTNAME}/confirmEmail/${encodeURIComponent(encryptor.encrypt(_id).replace(/\//g, '_'))}`,
    headerText: t(['hi'], lang, { username }),
    subject: t(['welcomeSubject'], lang, { username }),
  };

  await sendEmail(email, data);
}

// sendEmail('hydraorc@gmail.com', {
//   bodyTextBlock1: `<strong>Welcome to ${PLATFORM_NAME}.</strong> This is a test email`,
//   headerText: 'Hello, Hydra',
//   subject: 'This is a test email',
// });
