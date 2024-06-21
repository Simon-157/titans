import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import RequestsList from '../RequestsList';

describe('RequestsList component', () => {
  it('Should render RequestsList component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <RequestsList />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
