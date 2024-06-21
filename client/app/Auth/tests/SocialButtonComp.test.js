import React from 'react';
import { shallow } from 'enzyme';
import SocialButtonComp from '../SocialButtonComp';

describe('SocialButtonComp component', () => {
  it('Should render SocialButtonComp component without errors', () => {
    const component = shallow(
      <SocialButtonComp />,
    );

    expect(component.html()).not.toBe(null);
  });
});
