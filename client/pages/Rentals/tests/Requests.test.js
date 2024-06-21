import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Requests from '../Requests';

describe('Requests component', () => {
  it('Should render Requests component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <Requests />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
