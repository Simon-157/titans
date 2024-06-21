import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../Menu';

describe('Menu component', () => {
  it('Should render Menu component without errors', () => {
    const component = shallow(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>,
    );

    expect(component.html()).not.toBe(null);
  });
});
