import React from 'react';
import { shallow } from 'enzyme';
import RegistrationForm from '../RegistrationForm';

describe('RegistrationForm component', () => {
  it('Should render RegistrationForm component without errors', () => {
    const component = shallow(
      <RegistrationForm />,
    );

    expect(component.html()).not.toBe(null);
  });
});
