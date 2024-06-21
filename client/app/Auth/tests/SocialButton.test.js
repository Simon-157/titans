import React from 'react';
import { shallow } from 'enzyme';
import SocialButton from '../SocialButton';

describe('SocialButton component', () => {
  it('Should render SocialButton component without errors', () => {
    const component = shallow(
      <SocialButton />,
    );

    expect(component.html()).not.toBe(null);
  });
});
