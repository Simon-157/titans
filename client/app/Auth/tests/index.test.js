import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../index';

describe('Login component', () => {
  it('Should render Login component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
