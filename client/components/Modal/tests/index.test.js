import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../index';

describe('Modal component', () => {
  it('Should render Modal component without errors', () => {
    const component = shallow(
      <Modal />,
    );

    expect(component.html()).not.toBe(null);
  });
});
