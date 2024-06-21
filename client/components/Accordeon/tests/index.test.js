import React from 'react';
import { shallow } from 'enzyme';
import Accordeon from '../index';

describe('Accordeon component', () => {
  it('Should render Accordeon component without errors', () => {
    const component = shallow(
      <Accordeon />,
    );

    expect(component.html()).not.toBe(null);
  });
});
