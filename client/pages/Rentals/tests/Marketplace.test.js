import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { EnvironmentProvider } from 'client/lib/rentals/providers/EnvironmentProvider';
import { queryClient } from 'client/lib/rentals/common/queryClient';
import Marketplace from '../Marketplace';

describe('Marketplace component', () => {
  it('Should render Marketplace component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <EnvironmentProvider>
            <QueryClientProvider client={queryClient}>
              <Marketplace />
            </QueryClientProvider>
          </EnvironmentProvider>
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
