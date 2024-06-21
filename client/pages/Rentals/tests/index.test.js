import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Rentals from '../index';

describe('Rentals component', () => {
  it('Should render Rentals component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <Rentals />
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
