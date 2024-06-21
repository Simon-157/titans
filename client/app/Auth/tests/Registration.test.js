import React from 'react';
import { shallow } from 'enzyme';
import Registration from '../Registration';

describe('Registration component', () => {
  it('Should render Registration component without errors', () => {
    const component = shallow(
      <Registration />,
    );

    expect(component.html()).not.toBe(null);
  });
});
