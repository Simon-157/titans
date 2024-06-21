import React from 'react';
import { shallow } from 'enzyme';
import Content from '../Content';

describe('Content component', () => {
  it('Should render Content component without errors', () => {
    const component = shallow(
      <Content />,
    );

    expect(component.html()).not.toBe(null);
  });
});
