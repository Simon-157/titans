import React from 'react';
import { shallow } from 'enzyme';
import Input from '../index';

describe('Input component', () => {
  it('Should render Input component without errors', () => {
    const component = shallow(
      <Input />,
    );

    expect(component.html()).not.toBe(null);
  });
});
