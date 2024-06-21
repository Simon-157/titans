import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import FeaturedSub from '../FeaturedSub';

describe('FeaturedSub component', () => {
  it('Should render FeaturedSub component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <FeaturedSub />
      </Provider>,
    );

    expect(component.find('div').length).toBe(0);
  });
});
