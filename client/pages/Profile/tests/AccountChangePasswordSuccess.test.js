import React from 'react';
import { shallow } from 'enzyme';
import AccountChangePasswordSuccess from '../AccountChangePasswordSuccess';

describe('AccountChangePasswordSuccess component', () => {
  it('Should render AccountChangePasswordSuccess component without errors', () => {
    const component = shallow(
      <AccountChangePasswordSuccess />,
    );

    expect(component.html()).not.toBe(null);
  });
});
