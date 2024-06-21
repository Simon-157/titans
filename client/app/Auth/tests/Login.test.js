import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';

describe('Login component', () => {
  it('Should render Login component without errors', () => {
    const component = shallow(
      <Login />,
    );

    expect(component.html()).not.toBe(null);
  });
});
