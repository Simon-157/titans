import { spy } from 'sinon';
import { response } from '..';

const test = 'test';
const success = 200;
const forbidden = 403;

describe('response', () => {
  it('Should handle the arguments properly', () => {
    const res = {
      status: spy(),
      send: spy(),
    };

    response({ reason: test, status: forbidden }, res);
    response({ message: test }, res);
    response({ details: test }, res);
    response(test, res);
    response(null, res, test);

    expect(res.status.called).toEqual(true);
    expect(res.send.called).toEqual(true);

    expect(res.status.args[0][0]).toBe(forbidden);
    expect(res.send.args[0][0].err).toBe(test);

    expect(res.status.args[1][0]).toBe(400);
    expect(res.send.args[1][0].err).toBe(test);

    expect(res.status.args[2][0]).toBe(400);
    expect(res.send.args[2][0].err).toBe(test);

    expect(res.status.args[3][0]).toBe(400);
    expect(res.send.args[3][0].err).toBe(test);

    expect(res.status.args[4][0]).toBe(success);
    expect(res.send.args[4][0].err).toBe(undefined);
    expect(res.send.args[4][0].data).toBe(test);
  });
});
