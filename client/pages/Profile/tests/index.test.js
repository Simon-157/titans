import React from 'react';
import { shallow } from 'enzyme';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { emptyArr } from 'defaults';
import Profile from '../index';

describe('Profile component', () => {
  it('Should render Profile component without errors', () => {
    const component = shallow(
      <WalletProvider wallets={emptyArr}>,
        <Provider store={global.mockStore()}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      </WalletProvider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
