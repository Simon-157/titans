import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import history from '../../../history';
import FeaturedItem from '../FeaturedItem';

describe('FeaturedItem component', () => {
  it('Should render FeaturedItem component without errors', () => {
    const component = shallow(
      <Router history={history}>
        <FeaturedItem />
      </Router>,
    );

    expect(component.html()).not.toBe(null);
  });
});
