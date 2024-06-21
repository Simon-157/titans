import dayjs from 'dayjs';
import each from 'lodash/each';
import find from 'lodash/find';
import includes from 'lodash/includes';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import orderBy from 'lodash/orderBy';
import redis, { client } from 'server/connectors/redis';
import { syncWithOpenedSockets } from 'server/connectors/redisSub';
import extractParams from './extractParams';
import extractPublicationName from './extractPublicationName';
import subs from '../subs';

function checkParamOrder(subscriptionName) {
  const params = keys(extractParams(subscriptionName.replace(/\*/g, '')));
  const orderedParams = orderBy(params);

  if (JSON.stringify(params) !== JSON.stringify(orderedParams)) {
    // eslint-disable-next-line
    console.warn(
      `‼️  Update subscription params not alphabetically ordened: ${subscriptionName}`,
    );
  }
}

function checkIfSubscriptionStillExists(subscriptionName) {
  const publicationName = extractPublicationName(subscriptionName);

  const publication = find(global.publications, ['name', publicationName]) ||
  subs[publicationName];

  if (!isFunction(publication)) {
    // eslint-disable-next-line no-console
    console.warn(
      `😕 Couldn't find this subscription in subs. Does it still exist? ${publicationName}`,
    );
  }
}

async function getData(nameWithParams) {
  const name = extractPublicationName(nameWithParams);

  const publication = subs[name];

  // get filled in publicationObject
  if (!isFunction(publication)) {
    throw `Publication with name ${name} was not found`;
  }

  const params = extractParams(nameWithParams);
  // const combinedParams = merge(params, decoded);

  const data = await publication(params);

  return {
    data,
  };
}

async function updateSubscriptionAndSend(nameWithParams) {
  const newData = await getData(nameWithParams);

  const updateId = dayjs().valueOf();

  redis.setPublication(nameWithParams, {
    data: newData.data,
    updateId,
  });

  syncWithOpenedSockets({
    subscription: nameWithParams,
    data: newData.data,
  });
}

export async function triggerUpdateSubscription(subscriptionName) {
  // warn if params are not sorted alphabetically
  if (process.env.NODE_ENV === 'development') {
    checkParamOrder(subscriptionName);
    checkIfSubscriptionStillExists(subscriptionName);
  }

  let previousSubscriptions;
  if (includes(subscriptionName, '*')) {
    previousSubscriptions = await redis.getPublicationNamesByKey(subscriptionName);
  } else {
    previousSubscriptions = [subscriptionName];
  }

  each(previousSubscriptions, (previousSubscription) => {
    // updating without listening clients is useless
    if (!previousSubscription) {
      return;
    }

    updateSubscriptionAndSend(previousSubscription);
  });
}

global.flushAll = function flushAll() {
  client.sendCommand(['FLUSHALL']);
};

global.updateSub = function updateSub(subscriptionNames) {
  if (!subscriptionNames) {
    console.log('No subscriptions to update'); // eslint-disable-line
    console.trace(); // eslint-disable-line

    return;
  }

  if (isString(subscriptionNames)) {
    triggerUpdateSubscription(subscriptionNames);

    return;
  }

  each(subscriptionNames, (sub) => {
    if (!sub) {
      return;
    }

    triggerUpdateSubscription(sub);
  });
};
