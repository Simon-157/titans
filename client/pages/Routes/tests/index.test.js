import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../index';

describe('Routes component', () => {
  it('Should render Routes component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
