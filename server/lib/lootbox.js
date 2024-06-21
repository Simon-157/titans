// import keyBy from 'lodash/keyBy';
// import map from 'lodash/map';
import { emptyObj, NORMAL, MEDIUM, MEGA } from 'defaults';
import { Lootbox, LootboxActivity } from 'collections';
// import discordJson from './discord';

export const lootboxesTypes = [NORMAL, MEDIUM, MEGA];

export async function assignLootboxes(user = emptyObj) {
  const { _id, discordId } = user;

  if (!_id || !discordId) {
    return;
  }

  let lootboxes = await Lootbox.findAll({
    userId: _id,
  }, {
    projection: {
      _id: 1,
      discordId: 1,
    },
  });

  const promises = [];
  const updateIds = [];

  let found;
  let lootboxesLength = lootboxes.length;
  while (lootboxesLength-- > 0) {
    const lootbox = lootboxes[lootboxesLength];

    if (lootbox.discordId !== discordId) {
      updateIds.push(lootbox._id);
      found = true;
    }
  }

  if (found) {
    promises.push(
      LootboxActivity.collection.updateMany({
        userId: _id,
      }, {
        $set: {
          discordId,
        },
      }),
    );
  }

  lootboxes = await Lootbox.findAll({
    discordId,
  }, {
    projection: {
      _id: 1,
      userId: 1,
    },
  });

  found = false;
  lootboxesLength = lootboxes.length;
  while (lootboxesLength-- > 0) {
    const lootbox = lootboxes[lootboxesLength];

    if (lootbox.userId !== _id) {
      updateIds.push(lootbox._id);
      found = true;
    }
  }

  if (found) {
    promises.push(
      LootboxActivity.collection.updateMany({
        discordId,
      }, {
        $set: {
          userId: _id,
        },
      }),
    );
  }

  if (updateIds.length) {
    promises.push(
      Lootbox.collection.updateMany({
        _id: {
          $in: updateIds,
        },
      }, {
        $set: {
          discordId,
          userId: _id,
        },
      }),
    );

    global.updateSub(`lootboxes?userId=${_id}`);
  }

  if (promises.length) {
    await Promise.all(promises);
  }
}

// async function assignDiscordIDs() {
//   const discords = map(discordJson, 'discord');
//   const discordKeys = keyBy(discordJson, 'discord');
//
//   const lootboxes = await Lootbox.findAll({
//     discord: {
//       $in: discords,
//     },
//   }, {
//     projection: {
//       _id: 1,
//       discord: 1,
//     },
//   });
//
//   const promises = [];
//
//   let lootboxesLength = lootboxes.length;
//   while (lootboxesLength-- > 0) {
//     const lootbox = lootboxes[lootboxesLength];
//
//     const { _id, discord } = lootbox;
//
//     const withId = discordKeys[discord];
//
//     if (withId) {
//       const { discordId } = withId;
//
//       promises.push(
//         Lootbox.collection.updateOne({
//           _id,
//         }, {
//           $set: {
//             discordId,
//           },
//         }),
//         LootboxActivity.collection.updateMany({
//           discord,
//         }, {
//           $set: {
//             discordId,
//           },
//         }),
//       );
//     }
//   }
//
//   if (promises.length) {
//     await Promise.all(promises);
//   }
// }
//
// assignDiscordIDs();

// async function checkIfLootboxesAreCorrect() {
//   const promises = [
//     Lootbox.findAll(emptyObj, {
//       projection: {
//         _id: 1,
//         discord: 1,
//         normal: 1,
//         medium: 1,
//         mega: 1,
//       },
//     }),
//     LootboxActivity.findAll(emptyObj, {
//       projection: {
//         _id: 1,
//         discordId: 1,
//         normal: 1,
//         medium: 1,
//         mega: 1,
//       },
//     }),
//   ];
//
//   const [lootboxes, lootboxActivity] = await Promise.all(promises);
//
//   const calculatedByActivity = {};
//
//   let lootboxActivityLength = lootboxActivity.length;
//   while (lootboxActivityLength-- > 0) {
//     const activity = lootboxActivity[lootboxActivityLength];
//
//     const { discordId, normal = 0, medium = 0, mega = 0 } = activity;
//
//     if (!discordId) {
//       continue;
//     }
//
//     calculatedByActivity[discordId] = calculatedByActivity[discordId] || {
//       normal: 0,
//       medium: 0,
//       mega: 0,
//     };
//
//     calculatedByActivity[discordId].normal += normal;
//     calculatedByActivity[discordId].medium += medium;
//     calculatedByActivity[discordId].mega += mega;
//   }
//
//   let i = 0;
//   let lootboxesLength = lootboxes.length;
//   while (lootboxesLength-- > 0) {
//     const lootbox = lootboxes[lootboxesLength];
//
//     const { discordId, normal = 0, medium = 0, mega = 0 } = lootbox;
//
//     if (!discordId) {
//       continue;
//     }
//
//     if (!(
//       calculatedByActivity[discordId].normal === normal &&
//       calculatedByActivity[discordId].medium === medium &&
//       calculatedByActivity[discordId].mega === mega
//     )) {
//       i++;
//       console.log('###');
//       console.log(lootbox);
//       console.log(calculatedByActivity[discordId]);
//     }
//   }
//   console.log(i);
// }
//
// checkIfLootboxesAreCorrect();

// async function countLootboxes() {
//   const lootboxes = await Lootbox.findAll(emptyObj, {
//     projection: {
//       _id: 1,
//       discordId: 1,
//       normal: 1,
//       medium: 1,
//       mega: 1,
//     },
//   });
//
//   let normalSum = 0;
//   let mediumSum = 0;
//   let megaSum = 0;
//
//   console.log(lootboxes.length);
//
//   let lootboxesLength = lootboxes.length;
//   while (lootboxesLength-- > 0) {
//     const lootbox = lootboxes[lootboxesLength];
//
//     const { discordId, normal = 0, medium = 0, mega = 0 } = lootbox;
//
//     if (!discordId) {
//       continue;
//     }
//
//     normalSum += normal;
//     mediumSum += medium;
//     megaSum += mega;
//   }
//
//   console.log('Normal: ', normalSum);
//   console.log('Medium: ', mediumSum);
//   console.log('Mega: ', megaSum);
// }
//
// countLootboxes();
