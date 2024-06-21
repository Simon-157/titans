import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Alerts from '../index';

describe('Alerts component', () => {
  it('Should render Alerts component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <Alerts />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
