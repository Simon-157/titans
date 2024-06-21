import React from 'react';
import { shallow } from 'enzyme';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { Provider } from 'react-redux';
import { emptyArr } from 'defaults';
import AccountAvatar from '../AccountAvatar';

describe('AccountAvatar component', () => {
  it('Should render AccountAvatar component without errors', () => {
    const component = shallow(
      <WalletProvider wallets={emptyArr}>,
        <Provider store={global.mockStore()}>
          <AccountAvatar />
        </Provider>
      </WalletProvider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
