import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import BarInfo from '../FeaturedSub';

describe('BarInfo component', () => {
  it('Should render BarInfo component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BarInfo />
      </Provider>,
    );

    expect(component.find('div').length).toBe(0);
  });
});
