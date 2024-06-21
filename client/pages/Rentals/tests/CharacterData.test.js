import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { EnvironmentProvider } from 'client/lib/rentals/providers/EnvironmentProvider';
import { queryClient } from 'client/lib/rentals/common/queryClient';
import CharacterData from '../CharacterData';

describe('CharacterData component', () => {
  it('Should render CharacterData component without errors', () => {
    const component = shallow(
      <BrowserRouter>
        <EnvironmentProvider>
          <QueryClientProvider client={queryClient}>
            <CharacterData />
          </QueryClientProvider>
        </EnvironmentProvider>
      </BrowserRouter>,
    );

    expect(component.html()).not.toBe(null);
  });
});
