import client from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import isArray from 'lodash/isArray';
import { MailQueue } from 'collections';
import { config } from '../lib/smtp';
import Cron from './index';

client.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMailQueue() {
  let queue = await MailQueue.findAll();

  let queueLength = queue.length;
  if (queueLength) {
    const smtp = nodemailer.createTransport({
      ...config,
      pool: true,
    });

    while (queueLength-- > 0) {
      const mail = queue[queueLength];

      const { _id, options } = mail;

      const { to } = options;

      try {
        // eslint-disable-next-line no-await-in-loop
        await smtp.sendMail(options);

        // eslint-disable-next-line no-await-in-loop
        await MailQueue.collection.deleteOne({ _id });

        // eslint-disable-next-line no-await-in-loop
        // await knex('mail').insert({
        //   id: randomId(),
        //   content: JSON.stringify(options),
        //   date: new Date(),
        //   toEmail: JSON.stringify(to),
        // });
      } catch (err) {
        try {
          if (isArray(to)) {
            // eslint-disable-next-line no-await-in-loop
            await client.sendMultiple(options);
          } else {
            // eslint-disable-next-line no-await-in-loop
            await client.send(options);
          }

          // eslint-disable-next-line no-await-in-loop
          await MailQueue.collection.deleteOne({ _id });

          // eslint-disable-next-line no-await-in-loop
          // await knex('mail').insert({
          //   id: randomId(),
          //   content: JSON.stringify(options),
          //   date: new Date(),
          //   toEmail: JSON.stringify(to),
          // });
        } catch (err2) {
          break;
        }
      }
    }

    smtp.close();
  }

  queue = null;
}

function recurMailQueueCron() {
  const date = new Date();

  const ts = Math.round(date.getTime() / 1000);

  Cron.addScheduleJob(ts + (60 * 60 * 6), recurMailQueueCron); // 6 hours

  sendMailQueue();
}

setTimeout(recurMailQueueCron, 0);
// setTimeout(recurMailQueueCron, 600000); // 10 min
