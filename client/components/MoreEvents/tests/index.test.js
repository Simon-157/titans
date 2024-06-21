import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import MoreEvents from '..';

describe('MoreEvents component', () => {
  it('Should render MoreEvents component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <MoreEvents />
      </Provider>,
    );

    expect(component.html()).toBe('');
  });
});
