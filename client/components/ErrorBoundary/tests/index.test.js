import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../index';

describe('ErrorBoundary component', () => {
  it('Should render ErrorBoundary component without errors', () => {
    const component = shallow(
      <ErrorBoundary />,
    );

    expect(component.html()).toBe(null);
  });
});
