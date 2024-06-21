import React from 'react';
import { shallow } from 'enzyme';
import Tabs from '..';

describe('Tabs component', () => {
  it('Should render Tabs component without errors', () => {
    const component = shallow(
      <Tabs />,
    );

    expect(component.html()).not.toBe(null);
  });
});
