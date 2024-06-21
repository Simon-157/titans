import React from 'react';
import { shallow } from 'enzyme';
import AccountChangePassword from '../AccountChangePassword';

describe('AccountChangePassword component', () => {
  it('Should render AccountChangePassword component without errors', () => {
    const component = shallow(
      <AccountChangePassword />,
    );

    expect(component.html()).not.toBe(null);
  });
});
