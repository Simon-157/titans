import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../index';

describe('Footer component', () => {
  it('Should render Footer component without errors', () => {
    const component = shallow(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(component.html()).not.toBe(null);
  });
});
