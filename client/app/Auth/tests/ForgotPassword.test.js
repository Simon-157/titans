import React from 'react';
import { shallow } from 'enzyme';
import ForgotPassword from '../ForgotPassword';

describe('ForgotPassword component', () => {
  it('Should render ForgotPassword component without errors', () => {
    const component = shallow(
      <ForgotPassword />,
    );

    expect(component.html()).not.toBe(null);
  });
});
