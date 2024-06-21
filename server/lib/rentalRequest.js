import dayjs from 'dayjs';
import each from 'lodash/each';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import { Character, RentalRequest } from 'collections';
import { getGlobalSettings } from './global';

export async function acceptRentalRequest({
  characterId,
  requestId,
  subs,
  userId,
}) {
  const now = dayjs();

  const { rentedUntil } = await getGlobalSettings();

  const request = await RentalRequest.collection.findOne({
    _id: requestId,
    characterId,
  }, {
    projection: {
      _id: 1,
      declined: 1,
      owner: 1,
      taker: 1,
    },
  });

  if (!request) {
    return '404 Request Not Found';
  }

  const { declined, taker } = request;

  if (declined) {
    if (isArray(subs)) {
      let sub = `rentalRequests?userId=${taker}`;
      if (subs.indexOf(sub) === -1) {
        subs.push(sub);
      }

      sub = `rentalRequests?userId=${userId}`;
      if (subs.indexOf(sub) === -1) {
        subs.push(sub);
      }
    } else {
      global.updateSub([
        `rentalRequests?userId=${taker}`,
        `rentalRequests?userId=${userId}`,
      ]);
    }

    return '403 Forbidden - Already Declined';
  }

  const alreadyRented = await Character.findAll({
    taker,
  }, {
    projection: {
      _id: 1,
    },
  });

  if (alreadyRented.length >= 4) {
    return '403 Forbidden - Taker Already Renting 4 Titans';
  }

  await Promise.all([
    Character.collection.updateOne({
      _id: characterId,
    }, {
      $set: {
        owner: userId,
        rentedUntil,
        taker,
        userId: taker,
      },
    }),
    RentalRequest.collection.updateOne({
      _id: requestId,
    }, {
      $set: {
        accepted: now.toDate(),
        declined: null,
        owner: userId,
      },
    }),
    RentalRequest.collection.updateMany({
      _id: {
        $ne: requestId,
      },
      accepted: null,
      declined: null,
      characterId,
    }, {
      $set: {
        accepted: null,
        declined: now.toDate(),
        owner: userId,
      },
    }),
  ]);

  if (isArray(subs)) {
    let sub = `character?characterId=${characterId}`;
    if (subs.indexOf(sub) === -1) {
      subs.push(sub);
    }

    sub = `characters?userId=${taker}`;
    if (subs.indexOf(sub) === -1) {
      subs.push(sub);
    }

    sub = `characters?userId=${userId}`;
    if (subs.indexOf(sub) === -1) {
      subs.push(sub);
    }

    sub = `ownedCharacters?userId=${userId}`;
    if (subs.indexOf(sub) === -1) {
      subs.push(sub);
    }

    sub = 'charactersForRent?';
    if (subs.indexOf(sub) === -1) {
      subs.push(sub);
    }

    sub = `rentalRequests?userId=${taker}`;
    if (subs.indexOf(sub) === -1) {
      subs.push(sub);
    }

    sub = `rentalRequests?userId=${userId}`;
    if (subs.indexOf(sub) === -1) {
      subs.push(sub);
    }

    if (userId !== request.owner) {
      sub = `rentalRequests?userId=${request.owner}`;
      if (subs.indexOf(sub) === -1) {
        subs.push(sub);
      }
    }
  } else {
    // eslint-disable-next-line no-param-reassign
    subs = [
      `character?characterId=${characterId}`,
      `characters?userId=${taker}`,
      `characters?userId=${userId}`,
      'charactersForRent?',
      `ownedCharacters?userId=${userId}`,
      `rentalRequests?userId=${taker}`,
      `rentalRequests?userId=${userId}`,
    ];

    if (userId !== request.owner) {
      subs.push(`rentalRequests?userId=${request.owner}`);
    }

    global.updateSub(subs);
  }

  return null;
}

export async function declineAllRentalRequests({ characterIDs, subs }) {
  const requests = await RentalRequest.findAll({
    accepted: null,
    characterId: {
      $in: characterIDs,
    },
    declined: null,
  }, {
    projection: {
      _id: 1,
      owner: 1,
      taker: 1,
    },
  });

  let requestsLength = requests.length;
  if (requestsLength === 0) {
    return;
  }

  const ids = [];
  const userIDs = {};

  while (requestsLength-- > 0) {
    const request = requests[requestsLength];

    const { _id, owner, taker } = request;

    ids.push(_id);
    userIDs[owner] = true;
    userIDs[taker] = true;
  }

  const now = new Date();

  await RentalRequest.collection.updateMany({
    _id: {
      $in: ids,
    },
  }, {
    $set: {
      accepted: null,
      declined: now,
    },
  });

  if (isArray(subs)) {
    let sub = 'charactersForRent?';
    if (subs.indexOf(sub) === -1) {
      subs.push(sub);
    }

    each(userIDs, (_, userId) => {
      sub = `rentalRequests?userId=${userId}`;
      if (subs.indexOf(sub) === -1) {
        subs.push(sub);
      }
    });
  } else {
    // eslint-disable-next-line no-param-reassign
    subs = [
      'charactersForRent?',
      ...map(userIDs, (_, userId) => {
        return `rentalRequests?userId=${userId}`;
      }),
    ];

    global.updateSub(subs);
  }
}
