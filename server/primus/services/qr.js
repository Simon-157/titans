import dayjs from 'dayjs';
import { delay } from 'server/util/delay';
import { BAR, SET } from 'defaults';
import { Code, Promo } from 'collections';
import { hasAccess } from 'lib/role';
import { validate } from '../validate';

export default {
  async redeem({ data, res, spark }) {
    validate(data, {
      code: 'string',
    });

    const code = await Code.aggregateOne([
      {
        $match: {
          code: data.code,
        },
      },
      {
        $lookup: {
          from: 'events',
          localField: 'promoId',
          foreignField: 'promoId',
          as: 'event',
        },
      },
      {
        $lookup: {
          from: 'bars',
          localField: 'event.0.barId',
          foreignField: '_id',
          as: 'bar',
        },
      },
      {
        $project: {
          _id: 1,
          online: 1,
          promoId: 1,
          redeemed: 1,
          bar: {
            _id: 1,
            name: 1,
            userId: 1,
          },
          event: {
            _id: 1,
            barId: 1,
            deleted: 1,
          },
        },
      },
    ]);

    if (!code) {
      await delay(200); // delay requests on purpose to decrease bruteforce

      res.status(404).send('qr.wrong');

      return;
    }

    const {
      _id,
      online,
      promoId,
      redeemed,
    } = code;

    if (redeemed) {
      res.status(403).send(`Code was already redeemed at ${dayjs(redeemed).format('DD MMM YYYY, HH:mm')}`);

      return;
    }

    const event = code.event?.[0];

    if (!event) {
      res.status(403).send('404 - Event Not Found');

      return;
    }

    const bar = code.bar?.[0];

    if (!bar) {
      res.status(403).send('404 - Bar Not Found');

      return;
    }

    const { user } = spark;

    const allow = hasAccess({
      action: SET,
      item: bar,
      type: BAR,
      user,
    });

    if (!allow) {
      res.status(403).send(`Please ask "${bar.name}"'s bar owner to redeem the code`);

      return;
    }

    const { deleted, endAt } = event;

    if (deleted) {
      res.status(403).send('The event for this code was canceled');

      return;
    }

    if (Date.now() > dayjs(endAt).add(1, 'hour').valueOf()) {
      res.status(403).send('Event for this code is over');

      return;
    }

    await Promise.all([
      Code.collection.updateOne({
        _id,
      }, {
        $set: {
          redeemed: new Date(),
        },
      }),
      Promo.collection.updateOne({
        _id: promoId,
      }, {
        $inc: {
          [online ? 'redeemedForOnline' : 'redeemed']: 1,
        },
      }),
    ]);

    res.send(true);
  },
};
