import { stub } from 'sinon';
import { Log } from 'collections';
import { writeLog } from '../log';

describe('Log library', () => {
  it('Should write log without errors', async () => {
    const create = stub(Log, 'create');

    await writeLog();

    expect(create.callCount).toBe(1);

    create.restore();
  });
});
