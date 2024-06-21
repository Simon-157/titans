import React from 'react';
import { shallow } from 'enzyme';
import FeaturedBlock from '..';

describe('FeaturedBlock component', () => {
  it('Should render FeaturedBlock component without errors', () => {
    const component = shallow(
      <FeaturedBlock />,
    );

    expect(component.html()).not.toBe(null);
  });
});
