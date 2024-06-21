import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import NewsInfo from '../FeaturedSub';

describe('NewsInfo component', () => {
  it('Should render NewsInfo component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <NewsInfo />
      </Provider>,
    );

    expect(component.find('div').length).toBe(0);
  });
});
