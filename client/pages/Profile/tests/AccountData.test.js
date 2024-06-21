import React from 'react';
import { shallow } from 'enzyme';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { Provider } from 'react-redux';
import { emptyArr } from 'defaults';
import AccountData from '../AccountData';

describe('AccountData component', () => {
  it('Should render AccountData component without errors', () => {
    const component = shallow(
      <WalletProvider wallets={emptyArr}>,
        <Provider store={global.mockStore()}>
          <AccountData />
        </Provider>
      </WalletProvider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
