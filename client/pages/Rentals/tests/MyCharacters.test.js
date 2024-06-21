import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { emptyArr } from 'defaults';
import { EnvironmentProvider } from 'client/lib/rentals/providers/EnvironmentProvider';
import { queryClient } from 'client/lib/rentals/common/queryClient';
import MyCharacters from '../MyCharacters';

describe('MyCharacters component', () => {
  it('Should render MyCharacters component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <EnvironmentProvider>
            <QueryClientProvider client={queryClient}>
              <WalletProvider wallets={emptyArr}>,
                <MyCharacters />
              </WalletProvider>
            </QueryClientProvider>
          </EnvironmentProvider>
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
