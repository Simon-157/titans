import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { emptyArr } from 'defaults';
import { EnvironmentProvider } from 'client/lib/rentals/providers/EnvironmentProvider';
import { queryClient } from 'client/lib/rentals/common/queryClient';
import MyCharactersData from '../MyCharactersData';

describe('MyCharactersData component', () => {
  it('Should render MyCharactersData component without errors', () => {
    const component = shallow(
      <BrowserRouter>
        <EnvironmentProvider>
          <QueryClientProvider client={queryClient}>
            <WalletProvider wallets={emptyArr}>,
              <MyCharactersData />
            </WalletProvider>
          </QueryClientProvider>
        </EnvironmentProvider>
      </BrowserRouter>,
    );

    expect(component.html()).not.toBe(null);
  });
});
