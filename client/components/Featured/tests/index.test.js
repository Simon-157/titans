import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import history from '../../../history';
import Featured from '..';

describe('Featured component', () => {
  it('Should render Featured component without errors', () => {
    const component = shallow(
      <Router history={history}>
        <Featured />
      </Router>,
    );

    expect(component.html()).not.toBe(null);
  });
});
