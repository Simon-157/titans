import React from 'react';
import { shallow } from 'enzyme';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { emptyArr } from 'defaults';
import Wallet from '../index';

describe('Wallet component', () => {
  it('Should render Wallet component without errors', () => {
    const component = shallow(
      <WalletProvider wallets={emptyArr}>,
        <Wallet />
      </WalletProvider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
