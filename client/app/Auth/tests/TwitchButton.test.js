import React from 'react';
import { shallow } from 'enzyme';
import TwitchButton from '../TwitchButton';

describe('TwitchButton component', () => {
  it('Should render TwitchButton component without errors', () => {
    const component = shallow(
      <TwitchButton />,
    );

    expect(component.html()).not.toBe(null);
  });
});
