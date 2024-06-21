import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'client/history';
import EventContent from '../EventContent';

describe('EventContent component', () => {
  it('Should render EventContent component without errors', () => {
    const component = shallow(
      <Router history={history}>
        <Provider store={global.mockStore()}>
          <EventContent />
        </Provider>,
      </Router>,
    );

    expect(component.html()).not.toBe(null);
  });
});
