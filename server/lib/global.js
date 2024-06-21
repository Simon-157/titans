import { emptyObj } from 'defaults';
import { Global } from 'collections';

export async function getGlobalSettings() {
  const global = await Global.collection.findOne();

  return global || emptyObj;
}
