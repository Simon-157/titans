import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../../../history';
import EsportsFanEvent from '..';

describe('EsportsFanEvent component', () => {
  it('Should render EsportsFanEvent component without errors', () => {
    const component = shallow(
      <Router history={history}>
        <Provider store={global.mockStore()}>
          <EsportsFanEvent />
        </Provider>
      </Router>,
    );

    expect(component.html()).not.toBe(null);
  });
});
