import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import RequestsOutgoing from '../RequestsOutgoing';

describe('RequestsOutgoing component', () => {
  it('Should render RequestsOutgoing component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <RequestsOutgoing />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
