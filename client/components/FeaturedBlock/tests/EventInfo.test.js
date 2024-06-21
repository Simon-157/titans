import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import EventInfo from '../FeaturedSub';

describe('EventInfo component', () => {
  it('Should render EventInfo component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <EventInfo />
      </Provider>,
    );

    expect(component.find('div').length).toBe(0);
  });
});
