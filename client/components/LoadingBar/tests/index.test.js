import React from 'react';
import { shallow } from 'enzyme';
import LoadingBar from '../index';

describe('LoadingBar component', () => {
  it('Should render LoadingBar component without errors', () => {
    const component = shallow(
      <LoadingBar />,
    );

    expect(component.html()).not.toBe(null);
  });
});
