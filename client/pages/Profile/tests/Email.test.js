import React from 'react';
import { shallow } from 'enzyme';
import Email from '../Email';

describe('Email component', () => {
  it('Should render Email component without errors', () => {
    const component = shallow(
      <Email user={null} />,
    );

    expect(component.html()).not.toBe(null);
  });
});
