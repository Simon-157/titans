import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ResetPassword from '../index';

describe('ResetPassword component', () => {
  it('Should render ResetPassword component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <ResetPassword />
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
