import set from 'lodash/set';

export function Collection(Coll) {
  set(Coll, 'aggregateOne', async function aggregateOne(...payload) {
    const cursor = await Coll.collection.aggregate(...payload);

    const records = await cursor.toArray();

    return records[0];
  });

  set(Coll, 'findAll', async function findAll(...payload) {
    const cursor = await Coll.collection.find(...payload);

    return cursor.toArray();
  });

  return Coll;
}
