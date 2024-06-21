import React from 'react';
import { shallow } from 'enzyme';
import { addValidationRule } from 'formsy-react';
import { REQUIRED } from 'defaults';
import RegistrationSocialForm from '../RegistrationSocialForm';

describe('RegistrationSocialForm component', () => {
  it('Should render RegistrationSocialForm component without errors', () => {
    const component = shallow(
      <RegistrationSocialForm />,
    );

    addValidationRule(REQUIRED, (values, value) => !!value);

    expect(component.html()).not.toBe(null);
  });
});
