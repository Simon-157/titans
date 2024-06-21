import React from 'react';
import { shallow } from 'enzyme';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { emptyArr } from 'defaults';
import PluginWallets from '../PluginWallets';

describe('PluginWallets component', () => {
  it('Should render PluginWallets component without errors', () => {
    const component = shallow(
      <WalletProvider wallets={emptyArr}>,
        <PluginWallets />
      </WalletProvider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
