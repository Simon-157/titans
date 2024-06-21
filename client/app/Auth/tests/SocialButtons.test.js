import React from 'react';
import { shallow } from 'enzyme';
import SocialButtons from '../SocialButtons';

describe('SocialButtons component', () => {
  it('Should render SocialButtons component without errors', () => {
    const component = shallow(
      <SocialButtons />,
    );

    expect(component.html()).not.toBe(null);
  });
});
