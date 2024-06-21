import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Nav from '../Nav';

describe('Nav component', () => {
  it('Should render Nav component without errors', () => {
    const component = shallow(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
    );

    expect(component.html()).not.toBe(null);
  });
});
