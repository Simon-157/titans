import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import RequestsItemUser from '../RequestsItemUser';

describe('RequestsItemUser component', () => {
  it('Should render RequestsItemUser component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <RequestsItemUser />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
