import assign from 'lodash/assign';
import { getClientIpAddress } from '..';

const request = {
  headers: {},
  connection: {
    socket: {},
  },
  socket: {},
};

describe('getClientIpAddress', () => {
  it('Should return client ip address from x-forwarded-for', () => {
    const address = '127.0.0.1';

    const req = assign({}, request, {
      headers: {
        'x-forwarded-for': address,
      },
    });

    const result = getClientIpAddress(req);

    expect(result).toBe(address);
  });

  it('Should return client ip address from connection remoteAddress', () => {
    const address = '127.0.0.2';

    const req = assign({}, request, {
      connection: {
        remoteAddress: address,
      },
    });

    const result = getClientIpAddress(req);

    expect(result).toBe(address);
  });

  it('Should return client ip address from socket remoteAddress', () => {
    const address = '127.0.0.3';

    const req = assign({}, request, {
      socket: {
        remoteAddress: address,
      },
    });

    const result = getClientIpAddress(req);

    expect(result).toBe(address);
  });

  it('Should return client ip address from connection socket remoteAddress', () => {
    const address = '127.0.0.4';

    const req = assign({}, request, {
      connection: {
        socket: {
          remoteAddress: address,
        },
      },
    });

    const result = getClientIpAddress(req);

    expect(result).toBe(address);
  });
});
