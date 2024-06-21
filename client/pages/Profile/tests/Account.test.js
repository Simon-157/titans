import React from 'react';
import { shallow } from 'enzyme';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { Provider } from 'react-redux';
import { emptyArr } from 'defaults';
import Account from '../Account';

describe('Account component', () => {
  it('Should render Account component without errors', () => {
    const component = shallow(
      <WalletProvider wallets={emptyArr}>,
        <Provider store={global.mockStore()}>
          <Account />
        </Provider>
      </WalletProvider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
