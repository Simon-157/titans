import React from 'react';
import { shallow } from 'enzyme';
import Select from '../index';

describe('Select component', () => {
  it('Should render Select component without errors', () => {
    const component = shallow(
      <Select />,
    );

    expect(component.html()).not.toBe(null);
  });
});
