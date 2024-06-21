import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import NotFound from '../index';

describe('NotFound component', () => {
  it('Should render NotFound component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
