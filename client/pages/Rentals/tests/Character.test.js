import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { EnvironmentProvider } from 'client/lib/rentals/providers/EnvironmentProvider';
import { queryClient } from 'client/lib/rentals/common/queryClient';
import Character from '../Character';

describe('Character component', () => {
  it('Should render Character component without errors', () => {
    const component = shallow(

      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <EnvironmentProvider>
            <QueryClientProvider client={queryClient}>
              <Character />
            </QueryClientProvider>
          </EnvironmentProvider>
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
