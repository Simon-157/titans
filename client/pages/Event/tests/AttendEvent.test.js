import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import AttendEvent from '../AttendEvent';

describe('AttendEvent component', () => {
  it('Should render AttendEvent component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <AttendEvent />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
