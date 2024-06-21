import React from 'react';
import { shallow } from 'enzyme';
import SearchPreview from '../index';

describe('SearchPreview component', () => {
  it('Should render SearchPreview component without errors', () => {
    const component = shallow(
      <SearchPreview />,
    );

    expect(component.html()).not.toBe(null);
  });
});
