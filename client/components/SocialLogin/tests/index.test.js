import React from 'react';
import { shallow } from 'enzyme';
import SocialLogin from '../index';

describe('SocialLogin component', () => {
  it('Should render SocialLogin component without errors', () => {
    const component = shallow(
      <SocialLogin />,
    );

    expect(component.html()).not.toBe(null);
  });
});
